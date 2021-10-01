const Validator = require("./Validator");

class Bot {
  static async Setup(guild, client) {
    console.log("Connection ready. 😎");

    guild.FindEmoji(client, "mafiacata");
    guild.FindEmoji(client, "elklodiceloes");
    guild.FindEmoji(client, "graciosohermanito");
    guild.FindEmoji(client, "newman");
    guild.FindChannel(client, "861505455637266463");
    guild.FindChannel(client, "741117636150034463");
    guild.FindChannel(client, "885203239706963989");

    client.user.setPresence({
      status: "available",
      activity: {
        name: "neumann cumpleañito 😎🤙",
        type: "WATCHING",
      },
    });
  }

  static async Reply(interaction, response, client) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: response,
        },
      },
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

    if (msgContent == "!NEUMANN") {
      msg.reply(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.enlacejudio.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFrase-Judia-Si-todos-tiraramos-al-mismo-lado-cambiariamos-el-mundo-Enlace-Judio-Mexico-Proverbio-Frases-judias.jpg&f=1&nofb=1"
      );
      return;
    }

    if (msgContent.includes("NEUMANN")) {
      msg.react("🙏");
      msg.react("✡️");
    }

    if (msgContent.includes("KATA") || msgContent.includes("CATA")) {
      msg.react(guild.GetEmojiId("mafiacata"));
    }

    if (msgContent.includes("HERMANITO")) {
      msg.react(guild.GetEmojiId("elklodiceloes"));
    }

    if (msgContent.includes("PINGO")) {
      msg.react("🍆");
    }

    if (msgContent.includes("ANO")) {
      msg.react("🍩");
    }

    if (msg.author.id === "219602984546336781" && Validator.CheckUrlImg(url)) {
      msg.react(guild.GetEmojiId("graciosohermanito"));
      return;
    }
  }

  static SendMessage(msg, guild, client) {
    const channel = guild.FindChannel(client, "861505455637266463");

    channel
      .send(msg)
      .then((message) => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  }

  static SetPresence(client, activityName) {
    client.user.setPresence({
      status: "available",
      activity: {
        name: activityName,
        type: "WATCHING",
      },
    });
  }
}

module.exports = Bot;
