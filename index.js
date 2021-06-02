const app = require("./config/appLoader");

const { categoryRoute, lectureRoute, episodeRoute } = require("./routes");

app.use("/api/category", categoryRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/episode", episodeRoute);

app.get("/", (req, res) => {
	res.send("Welcome to Althaqalayn Backend API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
