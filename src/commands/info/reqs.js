const { Command } = require('discord.js-commando');

module.exports = class ReqsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reqs',
      group: 'info',
      memberName: 'reqs',
      description: 'Prints what the requirements for the guild are!',
      examples: [`${client.commandPrefix}reqs`],
    });
  }

  async run(message) {
    const infoChannel = message.guild.channels.cache.find((channel) => channel.name === 'info').toString();
    const send =
      `For all the requirements please head to ${infoChannel} as they are stated there\n\n` +
      'They are also stated on our forums thread & on our application!\n' +
      'Forums thread: <https://hypixel.net/threads/3013892/>\n' +
      'Application: <https://forms.gle/hdwJWdFsgiXdiCW58>';

    message.say(send);
  }
}