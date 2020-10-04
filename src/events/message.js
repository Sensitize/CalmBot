const { sendChatMessage } = require('../requests/calm.js');

module.exports = async function message(client, message) {
  // Prevent bot from responding to other bots and outside of a guild
  if (message.author.bot) return;
  if (!message.guild) return;

  // #count-to-x channel code so invalid numbers are deleted and channel name is updated
  if (message.channel.name.startsWith('count-to-')) {
    const messageList = await message.channel.messages.fetch({ limit: 2 });
    const previousMessage = messageList.last();
    const previousCount = parseInt(previousMessage.content, 10);
    const currentCount = parseInt(message.content, 10);

    // Makes sure user does not send message twice in a row
    if (message.author.tag === previousMessage.author.tag) {
      return message.delete();
    }

    // Checks if it is correct number OR if the message is not a number at all
    if (currentCount != previousCount + 1) {
      return message.delete();
    }

    // Checks if count is divisible by 1000, if so changes the channel name to #count-to-(current count + 1000)
    if (currentCount % 1000 === 0) {
      return message.channel.setName(`count-to-${Math.floor((currentCount + 1000) / 1000)}k`);
    }
  }

  if (message.channel.name === 'guild-chat-log') {
    sendChatMessage(message.content, (err, msg) => {
      if (err) {
        message.channel.send(err);
      } else {
        message.channel.send(`CalmBot sent message: \`${message.content}\``);
      }
    });
  }
};
