const shutdown = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR", { checkOwner: true })) {
    return message.channel.send("Error! You are not my owner!");
  } else {
    client.destroy();
  }
};

module.exports = shutdown;
