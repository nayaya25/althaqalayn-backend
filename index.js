const app = require("./config/appLoader");
const { initSuperUser } = require("./helpers");

const {
	categoryRoute,
	lectureRoute,
	episodeRoute,
	userRoute,
	roleRoute,
} = require("./routes");

app.use("/api/category", categoryRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/episode", episodeRoute);
app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.post("/api/init", initSuperUser);
app.get("/", async (req, res) => {
	await initSuperUser();
	res.send("Welcome to Althaqalayn Backend API");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
