require("dotenv").config();

module.exports = {
	databaseConnString: process.env.DBCONNSTRING,
	s3Bucket: process.env.S3_BUCKET_NAME,
	s3Id: process.env.AWS_ACCESS_KEY_ID,
	s3Secret: process.env.AWS_SECRET_ACCESS_KEY,
	jwtSecret: process.env.JWT_SECRET,
};
