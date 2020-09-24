const startup = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR", { checkOwner: true })) {
    return message.channel.send("Error! You are not my owner!");
  } else {
    // Changes bot from being shutdown to being up!
    client.settings.shutdown = false;
    message.reply("Bot is starting up!");

  }
};

module.exports = startup;
