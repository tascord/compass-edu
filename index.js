'use strict';

const p = require('puppeteer');
const EventEmitter = require('events');

class Compass extends EventEmitter {

    BASE_URL = null;
    LOGIN_URL = null;

    browser = null;
    page = null;

    settings = {};

    constructor(school_prefix, settings) {
        
        super();

        if(typeof school_prefix != 'string')
            throw(new Error(`Invalid type for school_prefix, ${typeof school_prefix} not string`));

        if(typeof settings != 'object' && typeof settings != 'undefined')
            throw(new Error(`Invalid type for settings, ${typeof settings} not object`));

        if(!school_prefix)
            throw(new Error("Missing school_prefix constructor"));

        this.BASE_URL = `https://${school_prefix}.compass.education/`;
        this.LOGIN_URL = `https://${school_prefix}.compass.education/login.aspx?sessionstate=disabled`;

        if(!settings) {
            
            this.settings = {
                showChrome: false,
                pageDelay: 2500
            }

        } else {
            
            this.settings = settings;

        }
        
        this.init();


    }

    async login(login) {

        if(this.page == null)
            throw(new Error(`Compass instance not initialized`))

        await this.page.goto(this.LOGIN_URL, { waitUntil: 'networkidle2' })
            .catch((err) => { throw(new Error(`Unable to establish a link with LOGIN_URL (${this.LOGIN_URL})`)); });
        
        /* Write Username & Password */
        await this.page.type('input[name="username"]', login.username, { delay: 5 })
            .catch((err) => { throw(new Error(`Unable to find the Username Field`)); });

        await this.page.type('input[name="password"]', login.password, { delay: 5 })
        .catch((err) => { throw(new Error(`Unable to find the Password Field`)); });
        
        await this.page.waitFor(500);

        await this.page.click('input[name="button1"]')
            .catch((err) => { throw(new Error(`Unable to find the Sign in Button`)); });
        
        this.emit('logged-in')

        await this.page.waitFor(this.settings.pageDelay);
        
    }

    async getClasses() {
       
        const classText = await this.page.evaluate(() => [...document.querySelectorAll('.ext-evt-bd')].map(elem => elem.innerText));
        var classes = [];

        for(var i in classText) {

            var newClass = {};

            var classData = classText[i].split(' ');

            newClass.time = classData[0].slice(0, -1);
            newClass.name = classData[3];
            newClass.room = classData[5];
            newClass.teacher = classData[7];

            classes.push(newClass);

        }

        this.emit('retreived-classes');

        return classes;

    }

    async returnHome() {

        await this.page.goto(this.BASE_URL, { waitUntil: 'networkidle2' });

        this.emit('home');

        await this.page.waitFor(this.settings.pageDelay);
        
    }

    async init() {
        

        this.browser = await p.launch({
            headless: this.settings.showChrome
        });

        this.page = await this.browser.newPage();

        this.emit('initialized');

    }


}


module.exports = Compass;