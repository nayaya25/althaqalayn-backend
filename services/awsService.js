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
		console.log("Bucket Created Successfully", data.Location);
	}
});

const deleteFileFromBucket = async (params) => {
	return new Promise((resolve, reject) => {
		s3.deleteObject(params, function (err, data) {
			if (err) {
				console.log({ err });
				return reject({ status: "error", ...err });
			}
			return resolve({ status: "success", ...data });
		});
	});
};

const saveFileInBucket = async (params) => {
	return new Promise((resolve, reject) => {
		s3.upload(params, function (err, data) {
			if (err) {
				console.log({ err });
				return reject(err);
			}
			return resolve(data);
		});
	});
};

module.exports = {
	saveFileInBucket,
	deleteFileFromBucket,
};
