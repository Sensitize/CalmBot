const { Command } = require('discord.js-commando');
const urls = require('../../data/img/arlo.json');

module.exports = class ArloCommnad extends Command {
  constructor(client) {
    super(client, {
      name: 'arlo',
      group: 'img',
      memberName: 'arlo',
      description: 'Sends a random image of arlo!',
      examples: [`${client.commandPrefix}arlo`],
    });
  }

  async run(message) {
    const img = urls[Math.floor(Math.random() * urls.length)];
    return message.say(img);
  }
};
