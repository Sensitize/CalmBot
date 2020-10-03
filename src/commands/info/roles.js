const { Command } = require('discord.js-commando');

module.exports = class RolesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roles',
      group: 'info',
      memberName: 'roles',
      description: 'Prints information on roles in the discord!',
      examples: [`${client.commandPrefix}roles`],
    });
  }

  async run(message) {
    const selfRolesChannel = message.guild.channels.cache.find((channel) => channel.name === 'self-assign-roles').toString();
    message.say(`You want some more roles? Go give yourself some in ${selfRolesChannel}!! <3`);
  }
};
