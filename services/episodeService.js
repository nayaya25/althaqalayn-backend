const { Episode } = require("../models");

module.exports = {
	async getAllEpisodes() {
		try {
			const episodes = await Episode.find();
			return episodes;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createEpisode(episode) {
		try {
			const newEpisode = Episode.create(episode);
			return newEpisode;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async updateEpisode(episodeId, newData) {
		try {
			const updatedEpisode = await Episode.findByIdAndUpdate(
				episodeId,
				newData
			);
			updatedEpisode.save();
			return updatedEpisode;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteEpisode(episodeId) {
		try {
			const deletedEpisode = await Lecture.findByIdAndDelete(episodeId);
			return deletedEpisode;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
};
