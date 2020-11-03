const { Command } = require('discord.js-commando');

module.exports = class SocialsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'socials',
      group: 'info',
      memberName: 'socials',
      description: "Prints the guild's socials!",
      examples: [`${client.commandPrefix}socials`],
    });
  }

  async run(message) {
    const send =
      '**Calm Social Media**\n' +
      'Twitter: <https://twitter.com/CalmGuild>\n' +
      'Plancke: <https://plancke.io/hypixel/guild/name/calm>\n' +
      'Forums Thread: <https://hypixel.net/threads/3013892>\n' +
      'YouTube: <https://www.youtube.com/channel/UC5NBW0EG7fFRKztTL4U96AQ>\n\n' +
      '**Guild Master's Media**\n' +
      'Twitter: <https://twitter.com/ignhopez>\n' +
      'Plancke: <https://plancke.io/hypixel/player/stats/hopez>\n' +
      'Forums: <https://hypixel.net/members/1689275>\n' +
      'YouTube: <https://www.youtube.com/hopez>';
    message.channel.send(send);
  }
};
