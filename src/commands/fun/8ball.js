const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')

const responses = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client, {
      name: '8ball',
      group: 'fun',
      memberName: '8ball',
      description: 'Ask the Magic 8Ball a question',
      examples: [`${client.commandPrefix}8ball`],
      args: [
        {
          key: 'question',
          prompt: 'Please enter your question',
          type: 'string',
        },
      ],
    });
  }

  run(message) {
      const _8ball = new MessageEmbed()
      .setTitle(`🎱 ${responses[Math.floor((Math.random() * responses.length) + 0)]}`)
      .setColor("#007FFF");
        message.channel.send(_8ball);
    }
};
