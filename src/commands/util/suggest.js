const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json');

module.exports = class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'suggest',
      group: 'util',
      memberName: 'suggest',
      description: 'Creates a suggestion to be voted on!',
      examples: [`${client.commandPrefix}suggest [suggestion]`],
      guildOnly: true,
      throttling: {
		usages: 1,
		duration: 900,
	},
      args: [
        {
          key: 'suggestion',
          prompt: 'please reply with your suggestion!',
          type: 'string',
        },
      ],
    });
  }
  
  async run(message, { suggestion }) {

  }
};
