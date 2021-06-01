exports.getFileName = async (filePath) => {
	const [, splitted] = filePath.split("//");
	const [, fileName] = splitted.split("/");
	return fileName;
};
