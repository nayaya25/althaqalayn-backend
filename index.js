const app = require("./config/loader");
const { categoryRoute, lectureRoute } = require("./routes");

app.use("/api/category", categoryRoute);
app.use("/api/lecture", lectureRoute);

const port = process.env.PORT || 8000;
app.listen(() => {
	console.log(`Listening on port ${port}`);
});
