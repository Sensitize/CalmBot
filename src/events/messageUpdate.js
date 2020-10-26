module.exports = async function messageUpdate(client, oldMessage, newMessage) {
  // compromise that prevents one person from breaking the entire channel without it being possible for the bot to ruin anything
  if (newMessage.channel.name.startsWith('count-to-')) {
    const messageList = await newMessage.channel.messages.fetch({ limit: 1 });
    const lastMessage = messageList.first();

    if (newMessage === lastMessage) {
      newMessage.delete();
    }
  }
};
