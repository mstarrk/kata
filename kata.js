// Dependancies
require('dotenv').config();
const Discord = require('discord.js');
const db = require('./controllers/Database');
// -------------------------------------------------

// Controllers
const Guild = require('./controllers/classes/Guild');
const Interaction = require('./controllers/classes/Interaction');
const Bot = require('./controllers/classes/Bot');
// -------------------------------------------------

// DISCORD: Client instance
const client = new Discord.Client();

//  ---------|| Hardcoded for testing: ||-----------
const guildId = '741107431882490006';
const NeumannArmy = new Guild('Neumann Army', guildId);
// -------------------------------------------------

// Run Program
// -------------------------------------------------
async function main() {
	// DB Init

	db.authenticate()
			.then(console.log('DB Authenticated.'))
		.catch((err) => console.error('DB auth error: '+ err));
		
	// DISCORD: Connecting
	client.login(process.env.DISCORD_BOT_TOKEN);
}
// -------------------------------------------------

// Event listeners
// -------------------------------------------------

client.on('ready', async () => {
	Bot.Setup(NeumannArmy, client);
	Bot.SendMessage("A", NeumannArmy, client);
});
client.on('message', (msg) => Bot.React(msg, NeumannArmy));
client.ws.on('INTERACTION_CREATE', (interaction) => {
	Interaction.Handle(interaction)
		.then((response) => Bot.Reply(interaction, response, client))
		.catch((err) => console.error(err));
});
// -------------------------------------------------

// Run
// -------------------------------------------------
main();
// -------------------------------------------------
