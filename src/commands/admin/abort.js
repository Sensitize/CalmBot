const { Command } = require('discord.js-commando');

module.exports = class AbortCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'abort',
      group: 'admin',
      memberName: 'abort',
      description: 'Takes the bot out of production',
      examples: [`${client.commandPrefix}abort`],
      guildOnly: true,
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: true });
  }

  async run(message) {
    this.client.destroy();
  }
};
