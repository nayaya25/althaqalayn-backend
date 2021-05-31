const AWS = require("aws-sdk");
const { s3Id, s3Secret, s3Bucket } = require("../config/envVariables");

// Setting AWS credentials
const s3 = new AWS.S3({
	accessKeyId: s3Id,
	secretAccessKey: s3Secret,
});

const bucketCreateParam = {
	Bucket: s3Bucket,
	CreateBucketConfiguration: {
		LocationConstraint: "us-east-2",
	},
};

s3.createBucket(bucketCreateParam, function (err, data) {
	if (err && err.statusCode == 409) {
		console.log("Bucket has been created already");
	} else if (err) {
		console.log({ err });
	} else {
		console.log(data);
		console.log("Bucket Created Successfully", data.Location);
	}
});

const saveFileInBucket = (params) => {
	return new Promise((resolve, reject) => {
		// Uploading files to the bucket
		s3.upload(params, function (err, data) {
			if (err) {
				console.log({ err });
				return reject(err);
			}
			// console.log(data)
			// console.log(`File uploaded successfully. ${data.Location}`)
			return resolve(data);
		});
	});
};

module.exports = {
	saveFileInBucket,
};
