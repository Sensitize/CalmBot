const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json')
module.exports = class ApplicationCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'application',
      group: 'info',
      memberName: 'application',
      description: 'Prints where to apply for the guild!',
      examples: [`${client.commandPrefix}application`],
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
      ':green_circle: STATUS: OPEN :green_circle: \n' +
      `If you need the requirements, please head to ${infoChannel} as they are stated there\n\n` +
      'However, they are also on our application below :)\n\n' +
      '**APPLICATION:** <https://forms.gle/tLkAkPJ8qEuCFVe16>';
    try{
      message.channel.send(send);
    } catch{
      message.channel.send("Uh oh! We could not find the info channel!");
    }
      
  }
};
