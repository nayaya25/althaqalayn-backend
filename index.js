const app = require("./config/appLoader");
const { categoryRoute, lectureRoute } = require("./routes");

app.use("/api/category", categoryRoute);
app.use("/api/lecture", lectureRoute);

app.get("/", (req, res) => {
	res.send("hi");
});

const PORT = process.env.PORT || 5000;
app.listen(() => {
	console.log(`Listening on port ${PORT}`);
});
