/* eslint-disable class-methods-use-this */

class Guild {
	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.emojis = [];
		this.channels = [];
	}

	FindEmoji(client, emojiName) {
		const emoji = client.emojis.cache.find((el) => el.name === emojiName);
		this.emojis.push(emoji);
		return emoji;
	}

	FindChannel(client, channelId) {
		const channel = client.channels.cache.get(channelId);
		this.channels.push(channel);
		return channel;
	}

	GetEmojiId(name) {
		if (!name) {
			throw new Error('EMOJI NOT FOUND = Empty name.');
		}

		return this.emojis.find((el) => el.name === name).id;
	}

	ListChannels() {
		this.channels.forEach((element) => {
			console.log(element);
		});
	}

	ListEmojis() {
		this.emojis.forEach((element) => {
			console.log(element);
		});
	}
}

module.exports = Guild;
