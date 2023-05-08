/* --------------------------------------------------------------------------- */

// Bring in the library
const Compass = require("../index");

/* --------------------------------------------------------------------------- */

// Create a login object
const login = {
	username: "",
	password: "",
};

/* --------------------------------------------------------------------------- */

// Create an instance of Compass
const user = new Compass("bunburyshs-wa", {
	pageDelay: 1000,
	showChrome: false,
});

// Wait until user is loaded in and ready to take instructions
user.on("initialized", async () => {
	// Login to user with the login object defined above
	await user.login(login).catch((error) => {
		console.log("Error loggin in '" + error + "'");
		process.exit(1);
	});

	// Get and store todays news in an array
	var news = await user.getNews();

	// List the news
	console.log(news);

	process.exit(1);
});
