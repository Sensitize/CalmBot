const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json');

module.exports = class UnlockCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unlock',
      group: 'admin',
      memberName: 'unlock',
      description: 'ryan was here',
      examples: [`${client.commandPrefix}unlock`],
      guildOnly: true,
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: true });
  }

  async run(message) {
    message.say('UNLOCKDOWN POG');
    
    let newsChannel;
    if (message.guild.id === '501501905508237312'){
      newsChannel = await message.guild.channels.cache.find((c) => c.id === channels.IMPORATNT.NEWS.id);
    } else {
      newsChannel = await message.guild.channels.cache.find((c) => c.name === channels.IMPORATNT.NEWS.name);
    }

    if (newsChannel) {
      newsChannel.send(`@here ${message.author.tag} has unlockdowned!!`);
    }

    for (const categoryName in channels) {
      for (const channelName in channels[categoryName]) {
        const channelProperties = channels[categoryName][channelName];

        let channel;
        if (message.guild.id === '501501905508237312'){
          channel = await message.guild.channels.cache.find((c) => c.id === channelProperties.id);
        } else {
          channel = await message.guild.channels.cache.find((c) => c.name === channelProperties.name);
        }

        if (!channel) {
          console.log(`Channel ${channelProperties.name} wasn't found`);
        } else if(channelProperties.public) {
            switch(categoryName){
              case "UPON_JOINING":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
              case "IMPORTANT":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
              case "COMMUNITY":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
              case "MISC":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
              case "VOICE":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
              case "EVENTS":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null });
                break;
            }
          }
      }
    }
  }
}