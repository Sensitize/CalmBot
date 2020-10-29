const { Command } = require('discord.js-commando');

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      aliases: ['user', 'whois'],
      group: 'util',
      memberName: 'userinfo',
      description: 'Returns a user\'s info',
      examples: [`${client.commandPrefix}userinfo [mention/id]`],
      guildOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Please enter the user\'s id / mention',
          type: 'string',
        },
      ],
    });
  }

  async run(message, { user }) {
    
  }
};
