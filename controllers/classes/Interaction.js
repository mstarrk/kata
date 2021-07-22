/* eslint-disable no-restricted-syntax */

const Meme = require.main.require('./models/Meme');
const Quote = require.main.require('./models/Quote');
const Entity = require('./Entity');
const Validator = require('./Validator');


class Interaction {
	static async Handle(interaction) {
		if (!interaction) return 'Error: interaccion no valida.';

		const { options, name: command } = interaction.data;
		const { id, username } = interaction.member.user;
		const args = {};

		if (options) {
			for (const option of options) {
				const { value: optionValue, name: optionName } = option;
				args[optionName] = optionValue;
			}
		}

		const { search_parameter: param } = args;

		String.prototype.toLowerCase(param);
		String.prototype.toLowerCase(command);

		const value = Object.keys(args).length === 0
			? null
			: Validator.ExtractNumber(args.search_parameter);

		if (command === 'meme') {
			if (Validator.isObjectEmpty(args) || !param || param === 'r') {
				const memes = await Meme.findAll();
				const meme = await Entity.GetRandom(memes);
				return meme.url;
			}

			if (value) {
				const memes = await Meme.findAll();
				const meme = await Entity.GetById(value, memes);
				return meme ? meme.url : 'No hay resultados';
			}

			const { url } = args;

			if (param === 's' && url) {
				if (!Validator.CheckUrlImg(url)) {
					return '🔗❌ - URL invalida (fijate que contenga una img).';
				}

				const replyMsg = await Entity.Set(Meme, { url, authorId: id, author: username });
				return replyMsg;
			}

			return '🔗❌ - Parametros invalidos.';
		}

		if (command === 'quote') {
			if (Validator.isObjectEmpty(args) || !param || param === 'r') {
				const quotes = await Quote.findAll();
				const quote = await Entity.GetRandom(quotes);
				return quote.text;
			}

			if (value) {
				const quotes = await Quote.findAll();
				const quote = await Entity.GetById(value, quotes);
				return quote ? quote.text : 'No hay resultados';
			}

			const { text } = args;

			if (param === 's' && text) {
				const replyMsg = await Entity.Set(Quote, { text, authorId: id, author: username });
				return replyMsg;
			}

			return '🔗❌ - Parametros invalidos.';
		}

		return 'que pingo ha pasao. Error desconocido :(';
	}
}

module.exports = Interaction;
