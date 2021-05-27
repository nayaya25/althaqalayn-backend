const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.disable("view cache");
app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 100 * 1024 * 1024 * 1024, //2MB max file(s) size
		},
		// useTempFiles: true,
	})
);

module.exports = app;
