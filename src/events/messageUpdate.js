const messageUpdate = (client, oldMessage, newMessage) => {
  if (client.features.countToChannel) {
    if (newMessage.channel.name.startsWith('count-to-')) {
      newMessage.delete();
    }
  }
};

module.exports = messageUpdate;
