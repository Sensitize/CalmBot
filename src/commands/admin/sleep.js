const { Command } = require('discord.js-commando');

module.exports = class SleepCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sleep',
      group: 'admin',
      memberName: 'sleep',
      description: 'Makes the bot go to sleep',
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
      group.setEnabledIn(message.guild, false);
    });
    message.say('All commands disabled!');
  }
};
