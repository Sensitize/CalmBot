const { Command } = require('discord.js-commando');

module.exports = class PollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'admin',
      memberName: 'poll',
      description: 'Creates a poll to be voted on',
      examples: [`${client.commandPrefix}poll Is Miqhtie Cool?`],
      guildOnly: true,
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: false });
  }

  async run(message) {

  }
};
