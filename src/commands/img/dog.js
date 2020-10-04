const { Command } = require('discord.js-commando');
const urls = require('../../data/img/dog.json');

module.exports = class DogCommnad extends Command {
  constructor(client) {
    super(client, {
      name: 'dog',
      group: 'img',
      memberName: 'dog',
      description: 'Sends a random image of a dog!',
      examples: [`${client.commandPrefix}dog`],
    });
  }

  async run(message) {
    const img = urls[Math.floor(Math.random() * urls.length)];
    return message.say(img);
  }
};
