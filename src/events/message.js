const fs = require('fs');
const path = require('path');

const { sendChatMessage } = require('../requests/calm.js');

const message = async (client, message) => {
  // Prevent bot from responding to other bots and outside of a guild
  if (message.author.bot) return;
  if (!message.guild) return;

  if (client.features.countToChannel) {
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
  }

  if (client.features.mentionSomeone) {
    if (message.content === '@someone') {
      // 1 in 10000 chance
      if (Math.random() < 0.0001) {
        message.channel.send('@everyone');
      } else {
        message.channel.send(`<@${message.guild.members.cache.random().id}>`);
      }
    }
  }

  if (client.features.guildChat) {
    if (message.channel.name === 'guild-chat-log') {
      sendChatMessage(message.content, (err, msg) => {
        if (err) {
          message.channel.send(err);
        } else {
          message.channel.send(`CalmBot sent message: \`${message.content}\``);
        }
      });
    }
  }

  // If you mention the bot, it will tell you its prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${client.settings.prefix}\``);
  }

  // Ignores any messages without prefix after this line
  if (!message.content.startsWith(client.settings.prefix)) return;

  // Derives args and command from message content
  const args = message.content.trim().slice(client.settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Puts args into the message object to avoid passing it again into the command function
  // It looks a bit cleaner without the extra argument in the cmd functions
  message.args = args;

  // If Bot is shutdown, return and do not execute command (unless command is to startup!)
  if (client.settings.shutdown) {
    if (message.content !== 'c!startup' && message.content !== 'c!sleep') {
      return;
    }
  }

  // If the command entered is loaded, execute it, otherwise tell the user that the command wasn't
  if (client.commands[command]) {
    client.commands[command](client, message);
  } else {
    message.channel.send(`\`command not found, run ${client.settings.prefix}help for a list of all commands\``);
  }
};

module.exports = message;
