const { Command } = require('discord.js-commando');
const urls = require('../../data/img/cat.json');

module.exports = class CatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      group: 'img',
      memberName: 'cat',
      description: 'Sends a random image of a cat!',
      examples: [`${client.commandPrefix}cat`],
    });
  }

  async run(message) {
    const img = urls[Math.floor(Math.random() * urls.length)];
    return message.say(img);
  }
};
