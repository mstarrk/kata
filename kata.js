// Dependancies
require("dotenv").config();
const Discord = require("discord.js");
const db = require("./controllers/Database");
// -------------------------------------------------

// Controllers
const Guild = require("./controllers/classes/Guild");
const Interaction = require("./controllers/classes/Interaction");
const Bot = require("./controllers/classes/Bot");
// -------------------------------------------------

// DISCORD: Client instance
const dClient = new Discord.Client();

//  ---------|| Hardcoded for testing: ||-----------
const guildId = "741107431882490006";
const NeumannArmy = new Guild("Neumann Army", guildId);
// -------------------------------------------------

// Run Program
// -------------------------------------------------
async function main() {
  // DB Init

  db.authenticate()
    .then(console.log("DB Authenticated."))
    .catch((err) => console.error("DB auth error: " + err));

  // DISCORD: Connecting
  dClient.login(process.env.DISCORD_BOT_TOKEN);

  // TCP
  console.log("Starting TCP server");

  const { unlinkSync } = require("fs");
  const { Server } = require("net");
  const server = Server({});

  const HANDLE = "/tmp/some-file.sock";
  try {
    unlinkSync(HANDLE);
  } catch (err) {
    if (err.code !== "ENOENT") console.log(err);
  }

  server.on("error", (err) => console.log(err));
  server.on("listening", () => console.log("Listening . . ."));
  server.on("connection", (client) => {
    console.log("Connection made");

    client.on("error", (err) => console.log(err));

    client.on("data", (data) => {
      console.log(`Raw data: ${data}`);

      const json = JSON.parse(data.toString());

      console.log(`JSON data: %j`, json);

      if (json.message) {
        Bot.SendMessage(json.message, json.channel, NeumannArmy, dClient);
        return;
      }

      if (json.status) {
        Bot.SetPresence(client, json.status);
        return;
      }

      throw Error("Data cannot be processed");
    });

    client.on("end", () => console.log("Connection Ended"));
  });

  server.listen(HANDLE);
}
// -------------------------------------------------
// Event listeners
// -------------------------------------------------

dClient.on("ready", async () => {
  Bot.Setup(NeumannArmy, dClient);
});
dClient.on("message", (msg) => Bot.React(msg, NeumannArmy));
dClient.ws.on("INTERACTION_CREATE", (interaction) => {
  Interaction.Handle(interaction)
    .then((response) => Bot.Reply(interaction, response, dClient))
    .catch((err) => console.error(err));
});
// -------------------------------------------------

// Run
// -------------------------------------------------
main();
// -------------------------------------------------

module.exports = Data;
