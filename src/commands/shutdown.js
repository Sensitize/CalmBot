const shutdown = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR", { checkOwner: true })) {
    return message.channel.send("Error! You are not my owner!");
  } else {
    if (!client.settings.shutdown) {
      client.settings.shutdown = true;
      message.reply("Bot is shutting down!");
    } else {
      message.reply("I'm ALREADY shut DOWN!!!!!!");
    }
  }
};

module.exports = shutdown;
