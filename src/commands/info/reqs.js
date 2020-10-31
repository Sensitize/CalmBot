const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json')
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
      let infoChannel;
      if (message.guild.id === '501501905508237312'){
        infoChannel = await message.guild.channels.cache.find((chan) => chan.id === channels.UPON_JOINING.INFO.id);
      } else {
        infoChannel = await message.guild.channels.cache.find((chan) => chan.name === channels.UPON_JOINING.INFO.name);
      }
      const send =
      `For all the requirements please head to ${infoChannel} as they are stated there\n\n` +
      'They are also stated on our forums thread & on our application!\n' +
      'Forums thread: <https://hypixel.net/threads/3013892/>\n' +
      'Application: <https://forms.gle/hdwJWdFsgiXdiCW58>';
      try{
        message.channel.send(send);
      } catch{
        message.channel.send("Uh oh! We could not find the info channel!");
      }
  }
};
