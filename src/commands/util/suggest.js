const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const channels = require('../../data/calm/channels.json');

module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      group: 'util',
      memberName: 'suggest',
      description: 'Creates a suggestion to be voted on!',
      examples: [`${client.commandPrefix}suggest [suggestion]`],
      guildOnly: true,
      throttling: {
		usages: 1,
		duration: 900,
	},
      args: [
        {
          key: 'suggestion',
          prompt: 'please reply with your suggestion!',
          type: 'string',
        },
      ],
    });
  }
  
  async run(message, { suggestion }) {

    let suggestionChannel, firstReaction, secondReaction, thirdReaction;
    thirdReaction = '🤷';
    if (message.guild.id === '501501905508237312'){
      suggestionChannel = await message.guild.channels.cache.find((chan) => chan.id === channels.SUGGESTIONS.SUGGESTIONS.id);
      firstReaction = '615239771723137026';     //  https://cdn.discordapp.com/emojis/615239771723137026.png?v=1
      secondReaction = '615239802127777817';    // https://cdn.discordapp.com/emojis/615239802127777817.png?v=1
    } else {
      suggestionChannel = await message.guild.channels.cache.find((chan) => chan.name === channels.SUGGESTIONS.SUGGESTIONS.name);
      firstReaction = '✅';
      secondReaction = '❎';
    }

    
    const suggestionEmbed = new MessageEmbed()
    .setFooter(`${message.member.displayName}`, message.author.displayAvatarURL())
    .setColor('#007FFF')
    .setTitle("Suggestion:")
    .setDescription(suggestion)
    .setTimestamp();

    try{
        suggestionChannel.send({embed: suggestionEmbed}).then(sentEmbed => {
        sentEmbed.react(firstReaction);
        sentEmbed.react(secondReaction);
        sentEmbed.react(thirdReaction);
      });
    } catch{
      message.channel.send("Uh oh! We could not find a channel to put the suggestion in!");
      return;
    }
    

    message.channel.send("Thanks for the suggestion! \n**Check it out: <#" + suggestionChannel.id + ">**");

  }
};
