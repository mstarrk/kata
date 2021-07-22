/* eslint-disable comma-dangle */
const Validator = require('./Validator');

class Bot {
	static async Setup(guild, client) {
		console.log('Connection ready. 😎');

		guild.FindEmoji(client, 'mafiacata');
		guild.FindEmoji(client, 'elklodiceloes');
		guild.FindEmoji(client, 'graciosohermanito');
		guild.FindChannel(client, '861505455637266463');
		guild.FindChannel(client, '741117636150034463');

		client.user.setPresence({
			status: 'available',
			activity: {
				name: '🔥♿',
				type: 'WATCHING',
			},
		});
	}

	static async Reply(interaction, response, client) {
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: response
				}
			}
		});
	}

	static async React(msg, guild) {
		if (msg.author.bot) return;

		const msgContent = msg.content.toUpperCase();

		const msgAttachments = msg.attachments.array();

		let url;

		if (msgAttachments.length > 0) {
			url = msgAttachments[0].url;
		}

		if (msg.author.id === '219602984546336781' && Validator.CheckUrlImg(url)) {
			msg.react(guild.GetEmojiId('graciosohermanito'));
			const cagoderisahermanito = guild.emojis.find((el) => el.name === 'graciosohermanito');
			msg.reply(`miren todos un meme del hermanito!!!! un cago de risa!! otro otro!!!🙏🤣👏👏🤣${cagoderisahermanito}`);
			return;
		}

		if (msgContent.includes('NEUMANN')) {
			msg.react('🙏');
			msg.react('✡️');
		}

		if (msgContent.includes('KATA') || msgContent.includes('CATA')) {
			msg.react(guild.GetEmojiId('mafiacata'));
		}

		if (msgContent.includes('HERMANITO')) {
			msg.react(guild.GetEmojiId('elklodiceloes'));
			msg.reply('el que lo dice lo es');
		}

		if (msgContent.includes('PINGO')) {
			msg.react('🍆');
		}

		if (msgContent.includes('ANO')) {
			msg.react('🍩');
		}
	}
}

module.exports = Bot;
