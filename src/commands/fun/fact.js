const { Command } = require('discord.js-commando');
const randomFact = require('../../requests/fact.js');

module.exports = class FactCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'fact',
      group: 'fun',
      memberName: 'fact',
      description: 'Fact command',
      examples: [`${client.commandPrefix}fact`],
    });
  }

  run(message) {
    randomFact((err, fact) => {
      if(err) {
        console.error(err);
      } else {
        message.say(`**FACT:** ${fact}`);
      }
    });
  }
}
