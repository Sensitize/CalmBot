const { Command } = require('discord.js-commando');
const channels = require('../../data/calm/channels.json')
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



    let selfRolesChannel;
    if (message.guild.id === '501501905508237312'){
      selfRolesChannel = await message.guild.channels.cache.find((chan) => chan.id === channels.UPON_JOINING.SELF_ASSIGN_ROLES.id);
    } else {
      selfRolesChannel = await message.guild.channels.cache.find((chan) => chan.name === channels.UPON_JOINING.SELF_ASSIGN_ROLES.name);
    }

    try{
      message.channel.send(`You want some more roles? Go give yourself some in ${selfRolesChannel}!! <3`)
    } catch{
      message.channel.send("Uh oh! We could not find the self-assign-roles channel!");
    }
  }
};
