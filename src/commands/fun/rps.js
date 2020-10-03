const { Command } = require('discord.js-commando');
const { MessageEmbed } = require("discord.js");

// Emoji's for bot to choose from for rock-paper-scissors
const chooseArr = ["🗻", "📰", "✂"];

module.exports = class RPSCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rps',
      group: 'fun',
      memberName: 'rps',
      description: 'Rock paper scissors!',
      examples: [`${client.commandPrefix}rps`],
    });
  }

  async run(message) {
    async function promptMessage(message, author, time, validReactions) {
      time *= 1000;

      for (const reaction of validReactions) await message.react(reaction);

      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

      return message.awaitReactions(filter, { max: 1, time: time }).then((collected) => collected.first() && collected.first().emoji.name);
    }

    function getResult(me, clientChosen) {
      if ((me === '🗻' && clientChosen === '✂') || (me === '📰' && clientChosen === '🗻') || (me === '✂' && clientChosen === '📰')) {
        return 'You won! GG';
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return 'You lost! L';
      }
    }

    const embed = new MessageEmbed()
      .setColor('#000000')
      .setTitle('Rock Paper Scissors')
      .setDescription('React with your choice to start the game!')
      .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
      .setTimestamp();

    const sentEmbed = await message.channel.send(embed);
    const reaction = await promptMessage(sentEmbed, message.author, 30, chooseArr);
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    const result = await getResult(reaction, botChoice);
    await sentEmbed.reactions.removeAll();
    embed.setDescription('').addField(result, `${reaction} vs ${botChoice}`);
    sentEmbed.edit(embed);
  }
}