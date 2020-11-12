const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const channels = require('../../data/calm/channels.json');

module.exports = class EmoteSuggestionCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emotesuggestion',
      group: 'util',
      memberName: 'emotesuggestion',
      description: 'Suggests an emote to be voted on!',
      examples: [`${client.commandPrefix}emotesuggestion *attach-file*`],
      guildOnly: true,
      throttling: {
		usages: 1,
		duration: 900,
	}
    });
  }
  
  async run(message, { suggestion }) {


    let imageurl;
    if(message.attachments.size > 0 && message.attachments.every(attachIsImage)){
        let attachment = (message.attachments).array();
        imageurl = attachment[0].url;
    } else {
        message.channel.send("Please attach an image to suggestion!");
        return;
    }

    let emoteSuggestionChannel, firstReaction, secondReaction, thirdReaction;
    thirdReaction = '🤷';
    if (message.guild.id === '501501905508237312'){
      emoteSuggestionChannel = await message.guild.channels.cache.find((chan) => chan.id === channels.SUGGESTIONS.EMOTE_SUGGESTIONS.id);
      firstReaction = '615239771723137026';     //  https://cdn.discordapp.com/emojis/615239771723137026.png?v=1
      secondReaction = '615239802127777817';    // https://cdn.discordapp.com/emojis/615239802127777817.png?v=1
    } else {
      emoteSuggestionChannel = await message.guild.channels.cache.find((chan) => chan.name === channels.SUGGESTIONS.EMOTE_SUGGESTIONS.name);
      firstReaction = '✅';
      secondReaction = '❎';
    }

    
    const suggestionEmbed = new MessageEmbed()
    .setFooter(`${message.member.displayName}`, message.author.displayAvatarURL())
    .setColor('#007FFF')
    .setTitle("Emote Suggestion:")
    .setImage(imageurl)
    .setTimestamp();

    try {
        emoteSuggestionChannel.send({embed: suggestionEmbed}).then(sentEmbed => {
        sentEmbed.react(firstReaction);
        sentEmbed.react(secondReaction);
        sentEmbed.react(thirdReaction);
      });
    } catch{
      message.channel.send("Uh oh! We could not find a channel to put the suggestion in!");
      return;
    }
    

    message.channel.send("Thanks for the suggestion! \n**Check it out: <#" + emoteSuggestionChannel.id + ">**");

  }


  
};



//thx stack overflow
function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    if(url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 || url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1){
      return true;
    }
    return false;
}
