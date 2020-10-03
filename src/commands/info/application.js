const { Command } = require('discord.js-commando');

module.exports = class ApplicationCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'application',
      group: 'info',
      memberName: 'application',
      description: 'Prints where to apply for the guild!',
      examples: [`${client.commandPrefix}application`],
    });
  }

  async run(message) {
    const infoChannel = message.guild.channels.cache.find((channel) => channel.name === 'info').toString();
    const send =
      ':green_circle: STATUS: OPEN :green_circle: \n' +
      `If you need the requirements, please head to ${infoChannel} as they are stated there\n\n` +
      'However, they are also on our application below :)\n\n' +
      '**APPLICATION:** <https://forms.gle/tLkAkPJ8qEuCFVe16>';
    message.say(send);
  }
}