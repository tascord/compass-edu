
/* --------------------------------------------------------------------------- */

// Bring in the library
const Compass = require('../index');

/* --------------------------------------------------------------------------- */

// Create a login object
const login = {username: "", password: ""};

/* --------------------------------------------------------------------------- */

// Create an instance of Compass
const user = new Compass('https://[...].compass.education');

// Wait until user is loaded in and ready to take instructions
user.on('initialized', async () => {

    // Login to user with the login object defined above
    await user.login(login)
        .catch(error => {

            console.log("Error loggin in '" + error + "'");
            process.exiit(1);

        });
    
    // Get and store todays classes in an array
    var classes = await user.getClasses();

    // List the classes
    console.table(classes);

});
