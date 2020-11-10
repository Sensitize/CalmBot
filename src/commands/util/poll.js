const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'admin',
      memberName: 'poll',
      description: 'Creates a poll to be voted on',
      examples: [`${client.commandPrefix}poll Is Miqhtie Cool?`],
      guildOnly: true,
      args: [
        {
          key: 'poll',
          prompt: 'please reply with your poll!',
          type: 'string',
        },
      ],
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: false });
  }

  async run(message, { poll }) {
    let firstReaction, secondReaction;
    if (message.guild.id === '501501905508237312'){
        firstReaction = '615239771723137026';     //  https://cdn.discordapp.com/emojis/615239771723137026.png?v=1
        secondReaction = '615239802127777817';    // https://cdn.discordapp.com/emojis/615239802127777817.png?v=1
      } else {
        firstReaction = '✅';
        secondReaction = '❎';
      }

      let pollEmbed = new MessageEmbed()
      .setFooter(`${message.member.displayName}`, message.author.displayAvatarURL())
      .setColor('#007FFF')
      .setTitle("New Poll:")
      .setDescription(poll)
      .setTimestamp();


      try{
        message.channel.send({embed: pollEmbed}).then(sentEmbed => {
        message.delete();
        sentEmbed.react(firstReaction);
        sentEmbed.react(secondReaction);
      });
    } catch{
      message.channel.send("Uh oh! Something went wrong while attempting to create a poll!");
      return;
    }
    
      
  }
};
