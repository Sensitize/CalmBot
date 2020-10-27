const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json');

module.exports = class UnlockCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unlock',
      group: 'admin',
      memberName: 'unlock',
      description: 'Unlocks the server after being locked!',
      examples: [`${client.commandPrefix}unlock`],
      guildOnly: true,
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: true });
  }

  async run(message) {
    message.say('Unlocking Channels!');

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
      newsChannel.send(`**Attention,** \n<@${message.author.id}> has **unlocked** the server! \nYou are **now free to chat**!`);
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
          channel.updateOverwrite(guildMemberRole, { SEND_MESSAGES: null, ADD_REACTIONS: null });
        } else if(channelProperties.public) {
            switch(categoryName){
              case "UPON_JOINING":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
              case "IMPORTANT":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
              case "COMMUNITY":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
              case "MISC":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
              case "VOICE":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
              case "EVENTS":
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, ADD_REACTIONS: null });
                break;
            }
          }
      }
    }
  }
}