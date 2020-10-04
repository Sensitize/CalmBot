const { Command } = require('discord.js-commando');

module.exports = class StartupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'startup',
      group: 'admin',
      memberName: 'startup',
      description: 'Wakes up the bot',
      examples: [`${client.commandPrefix}sleep`],
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: true });
  }

  async run(message) {
    const groups = this.client.registry.findGroups();
    groups.forEach((group, i) => {
      if (group.id === 'admin') return;
      group.setEnabledIn(message.guild, true);
    });
    message.say('All commands enabled!');
  }
};
