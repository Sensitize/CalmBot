const { Command } = require('discord.js-commando');

module.exports = class RolesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'birthday',
      group: 'info',
      memberName: 'birthday',
      description: 'Prints information on how to get the birthday nerd role in the discord!',
      examples: [`${client.commandPrefix}birthday`],
    });
  }

  async run(message) {
    const commandsChannel = message.guild.channels.cache.find((channel) => channel.id === '755609336155209858').toString();
    message.say(`Want a special "Birthday Nerd" role when it's your birthday?????? AWESOME! FOLLOW THE INSTRUCTIONS BELOW!\n\nGo to ${commandsChannel} and execute the command below with your personal bday:\n\nCommand: bb.set (date) [timezone]\n-Example: bb.set oct-21 es\n\nTo find the timezone the bot will accept, click this link and copy the timezone given EXACTLY how it is: https://xske.github.io/tz/`);
  }
};
