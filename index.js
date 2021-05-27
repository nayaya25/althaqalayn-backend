const app = require("./config/loader");

const port = process.env.PORT || 8000;
app.listen(() => {
	console.log(`Listening on port ${port}`);
});
