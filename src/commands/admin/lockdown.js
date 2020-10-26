const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json');

module.exports = class LockdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lockdown',
      group: 'admin',
      memberName: 'lockdown',
      description: 'Disables chat for everyone until unlocked.',
      examples: [`${client.commandPrefix}lockdown`],
      guildOnly: true,
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: true });
  }

  async run(message) {
    message.say('Initiating Server Lockdown... All public channels will be locked until you run `c!unlock`');

    let guildMemberRole;
        if (message.guild.id === '501501905508237312'){
          guildMemberRole = message.guild.roles.cache.get("501504002853306388");
        } else {
          guildMemberRole = message.guild.roles.cache.find(role => role.name === "Guild Member");
        }
    
    let newsChannel;
    if (message.guild.id === '501501905508237312'){
      newsChannel = await message.guild.channels.cache.find((c) => c.id === channels.IMPORATNT.NEWS.id);
    } else {
      newsChannel = await message.guild.channels.cache.find((c) => c.name === channels.IMPORATNT.NEWS.name);
    }

    if (newsChannel) {
      newsChannel.send(`**Attention @here,** \n<@${message.author.id}> has **initiated** a _server lockdown_. \nYou are **not muted**, but will not be able to talk till a server admin does \`c!unlock\``);
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
        } else if(channelProperties.membersOnly) {
          channel.updateOverwrite(guildMemberRole, { SEND_MESSAGES: false, ADD_REACTIONS: false});
        } else if(channelProperties.public) {
            switch(categoryName){
              case "UPON_JOINING":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
              case "IMPORTANT":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
              case "COMMUNITY":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
              case "MISC":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
              case "VOICE":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
              case "EVENTS":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false, ADD_REACTIONS: false});
                break;
            }
          }
      }
    }
  }
}