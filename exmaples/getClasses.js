
/* --------------------------------------------------------------------------- */

// Bring in the library
const Compass = require('./index');

/* --------------------------------------------------------------------------- */

// Create a login object
const login = {username: "", password: ""};

/* --------------------------------------------------------------------------- */

// Create an instance of Compass
const school = new Compass('https://[...].compass.education');

// Wait until school is loaded in and ready to take instructions
school.on('initialized', async () => {

    // Login to school with the login object defined above
    await school.login(login)
        .catch(error => {

            console.log("Error loggin in '" + error + "'");
            process.exiit(1);

        });
    
    // Get and store todays classes in an array
    var classes = await school.getClasses();

    // List the classes
    console.table(classes);

});
