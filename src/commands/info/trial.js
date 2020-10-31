const { Command } = require('discord.js-commando');

module.exports = class TrialCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'trial',
      group: 'info',
      memberName: 'trial',
      description: "Prints the guild's trial applicaton!",
      examples: [`${client.commandPrefix}trial`],
    });
  }

  async run(message) {
    const send =
      'So you want to be Calm staff?? Awesome!!!\n\n' +
      'Currently, our only requirements for Trial Officer are: Mee6 level 15+, have 2fa enabled on your account, and be in Calm Guild for a month or more!\n\n' +
      'App: <https://forms.gle/XArRWZycn648f2aZ7>';
    message.channel.send(send);
  }
};
