/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */

// Dependancies
const Discord = require('discord.js');
const util = require('util');
const mysql = require('mysql');
const { token, dbCredentials } = require('./config.json');

const client = new Discord.Client();


// DATABASE FACTORY FUNCTION
function MakeDb(dbConfig) {
	const connection = mysql.createConnection(dbConfig);
	return {
		query(sql, args) {
			return util.promisify(connection.query).call(connection, sql, args);
		},
		close() {
			return util.promisify(connection.end).call(connection);
		},
	};
}

// DB Init
const db = new MakeDb(dbCredentials);

// DISCORD Connection ready
function readyDiscord() {
	console.log('yo yo yo. 😎');
	console.log('k onda pa ya estoy ready');
}

// DISCORD Connecting
client.login(token);

client.on('ready', readyDiscord);

// Emojis
let emMafiacata;
let emElklodiceloes;

// Channels
let chKataTest;
let chNsfw;

// GUILD
const guildId = '741107431882490006';

// Set emojis
function setEmojis() {
	emMafiacata = client.emojis.cache.find((emoji) => emoji.name === 'mafiacata');

	emElklodiceloes = client.emojis.cache.find((emoji) => emoji.name === 'elklodiceloes');
}

// Set channels
function setChannels() {
	chKataTest = client.channels.cache.get('861505455637266463');
	chNsfw = client.channels.cache.get('741117636150034463');
}

// Const
const getApp = (_guildId) => {
	const app = client.api.applications(client.user.id);
	if (_guildId) {
		app.guilds(_guildId);
	}
	return app;
};
const reply = (interaction, response) => {
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data: {
				content: response
			}
		}
	});
};

// Utilities

function checkForImgInURL(url) {
	return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

// GET Functions = select data from database.

async function getRandomMessage() {
	const messages = [];
	const sql = 'SELECT message FROM randommessages WHERE 1';

	try {
		const rows = await db.query(sql);
		rows.forEach((element) => {
			messages.push(element.message);
		});
		const r = Math.floor(Math.random() * messages.length);
		return messages[r];
	}
	catch (err) {
		return err;
	}
}

async function getRandomVideo() {
	return 'sin implementar';
}

async function getRandomMeme() {
	const memes = [];
	const sql = 'SELECT url FROM memes WHERE 1';

	try {
		const rows = await db.query(sql);
		rows.forEach((element) => {
			memes.push(element.url);
		});
		const r = Math.floor(Math.random() * memes.length);
		console.log(memes);
		console.log(memes[r]);
		return memes[r];
	}
	catch (err) {
		return err;
	}
}

// SET Functions = insert data into database.

async function setRandomMessage(_msg, _id, _username) {
	const sql = `INSERT INTO randommessages(message, authorId, username) VALUES ('${_msg}','${_id}','${_username}')`;

	try {
		await db.query(sql);
		return 'El texto fue guardado correctamente :)';
	}
	catch (err) {
		return err;
	}
}

async function setRandomMeme(_url, _id, _username) {
	const sql = `INSERT INTO memes(url, authorId, username) VALUES ('${_url}','${_id}','${_username}')`;

	try {
		await db.query(sql);
		return 'Meme guardado :)';
	}
	catch (err) {
		return err;
	}
}

// SEND Functions = send message to specific channel.

async function sendRandomMessage(channel) {
	const msg = await getRandomMessage();
	channel.send(msg);
}

async function sendRandomVideo(channel) {
	// sends a random video
}

// REPLY Functions = replies to interactions.
async function replyRandomMeme(interaction) {
	const meme = await getRandomMeme();
	reply(interaction, meme);
}


// React to messages
function react(msg) {
	if (msg.author.bot) return;

	const msgContent = msg.content.toUpperCase();

	if (msgContent.includes('KATA') || msgContent.includes('CATA')) {
		msg.react(emMafiacata.id);
	}

	if (msgContent.includes('PINGO')) {
		msg.react('🍆');
	}

	if (msgContent.includes('ANO')) {
		msg.react('🍩');
	}

	if (msgContent.includes('NEUMANN')) {
		msg.react('🙏');
		msg.react('✡️');
	}

	if (msgContent.includes('HERMANITO')) {
		msg.react(emElklodiceloes.id);
		msg.reply('el que lo dice lo es');
	}

	if (msgContent.includes('TEST')) {
		// sin implementar
	}
}

// Handle new messages
function gotMessage(msg) {
	react(msg);
}

// Listen to new messages
client.on('message', gotMessage);

// Handle command interactions
client.ws.on('INTERACTION_CREATE', async (interaction) => {
	console.log('ws.on lmao');
	const { options, name } = interaction.data;
	const { id, username } = interaction.member.user;
	const command = name.toLowerCase();

	const args = {};

	if (options) {
		for (const option of options) {
			// eslint-disable-next-line no-shadow
			const { name, value } = option;
			args[name] = value;
		}
	}

	console.log(options);

	if (command === 'memes') {
		if (options) {
			const { accion, url } = args;

			if (accion != null && accion === 'SET' && url !== null && url !== '') {
				if (checkForImgInURL(url)) {
					const replyMsg = await setRandomMeme(url, id, username);
					reply(interaction, replyMsg);
				}
				else {
					reply(interaction, 'URL invalida (debe contener una imagen).');
				}
			}
			else if (accion != null && accion === 'GET') {
				replyRandomMeme(interaction);
			}
			else {
				reply(interaction, 'Esos parametros no son validos. "URL" no puede estar vacio.');
			}
		}
		else {
			replyRandomMeme(interaction);
		}
	}

	if (command === 'random_message') {
		if (options) {
			const { msg, set } = args;
			if (set != null && set === true && msg !== null && msg !== '') {
				const replyMsg = await setRandomMessage(msg, id, username);
				reply(interaction, replyMsg);
			}
			else {
				reply(interaction, 'Esos parametros no son validos. "msg" no puede estar vacio y "SET" tiene que ser TRUE.');
			}
		}
		else {
			const msg = await getRandomMessage();
			reply(interaction, msg);
		}
	}
});

// TESTs

async function setCommands() {
	// new commands

	console.log('set commands called');

	await getApp(guildId).commands.post({
		data: {
			name: 'random_message',
			description: 'Coleccion de mensajes aleatorios - Agregar SET para guardar un mensaje.',
			options: [
				{
					name: 'set',
					description: '"SET": Guardar un mensaje (requiere mensaje)',
					required: false,
					type: 5
				},
				{
					name: 'msg',
					description: 'Texto a guardar',
					required: false,
					type: 3
				}
			]
		}
	});
}

// Connected and ready to start: set bot's data.
client.on('ready', async () => {
	setEmojis();
	setChannels();
	client.user.setPresence({
		status: 'available',
		activity: {
			name: '🔥👌',
			type: 'WATCHING',
		},
	});
	// sendRandomMessage(chKataTest);
	// await getApp(guildId).commands('COMMAND ID').delete();
	// await setCommands();
	const commands = await getApp(guildId).commands.get();
	console.log(commands);
});

