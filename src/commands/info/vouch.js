const { Command } = require('discord.js-commando');

module.exports = class VouchCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'vouch',
      group: 'info',
      memberName: 'vouch',
      description: 'Prints an explanation of the vouch system!',
      examples: [`${client.commandPrefix}vouch`],
    });
  }

  async run(message) {
    const commandsChannel = message.guild.channels.cache.find((channel) => channel.name === 'commands').toString();
    const send =
      '**Vouch System**\n' +
      'To be eligable to vouch a member in Calm, you must be Trusted+.\n' +
      'To be vouched into Calm, you must be no lower than Hypixel level 65.\n\n' +
      'Each rank below gets the number of vouches listed PER MONTH.\n\n' +
      'Trusted: 3\nLoyal: 4\nOG: 5\nGuild Staff: 6\n\n' +
      `*If you have any questions, please do \`t!open\` in ${commandsChannel} to open a ticket and talk to staff*`;
    message.say(send);
  }
};
