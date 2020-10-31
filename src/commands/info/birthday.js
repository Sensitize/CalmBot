const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json')
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
    let commandsChannel;
    
    if (message.guild.id === '501501905508237312'){
      commandsChannel = await message.guild.channels.cache.find((chan) => chan.id === channels.COMMUNITY.COMMANDS.id);
    } else {
      commandsChannel = await message.guild.channels.cache.find((chan) => chan.name === channels.COMMUNITY.COMMANDS.name);
    }
    try{
      message.channel.send(`Want a special "Birthday Nerd" role when it's your birthday?????? AWESOME! FOLLOW THE INSTRUCTIONS BELOW!\n\nGo to ${commandsChannel} and execute the command below with your personal bday:\n\nCommand: bb.set (date) [timezone]\n-Example: bb.set oct-21 es\n\nTo find the timezone the bot will accept, click this link and copy the timezone given EXACTLY how it is: https://xske.github.io/tz/`);
    } catch{
      message.channel.send("Uh oh! We could not find the commands channel!");
    }
    }
};
