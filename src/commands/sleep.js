const shutdown = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR", { checkOwner: true })) {
    return message.channel.send("Error! You are not my owner!");
  } else {
    // Checks if bot is already in a shutdown state.
    if (!client.settings.shutdown) {
      // Sets bot into shutdown state.
      client.settings.shutdown = true;
      message.reply("Bot is shutting down!");
    } else {
      message.reply("Bot is in sleep mode, please do c!startup to start it up again.");
    }
  }
};

module.exports = shutdown;
