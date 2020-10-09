const { Command } = require('discord.js-commando');
const randomFact = require('../../requests/fact.js');

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

module.exports = class FactCommand extends Command {
  constructor(client) {
    super(client, {
      name: '8ball',
      group: 'fun',
      memberName: '8ball',
      description: '8ball Command',
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
        message.channel.send(responses[Math.floor((Math.random() * responses.length) + 0)])
    }
};
