const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const nodemon = require('nodemon');

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
          prompt: 'Please mention the user, or provide their ID!',
          type: 'member',
        },
      ],
    });
  }

  async run(message, { user }) {
    let userCached = this.client.users.cache.get(user.id);
    let bot;

    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      };

      const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
      };

    const cachedUserFlags = userCached.flags.toArray();

    let userInfoEmbed = new MessageEmbed()
                .setThumbnail(userCached.displayAvatarURL())
                .setColor("#007fff")
                .addField("Username", `${userCached.username}`, true)
                .addField("User ID", user.id, true)
                .addField("Nickname", `${user.displayName}`, true)
                .addField("Bot", `${userCached.bot ? bot = 'A bot' : bot = 'Not a bot'}`, true)
                .addField("Status", `${status[userCached.presence.status]}`, true)
                .addField("Playing", `🎮 ${user.presence.game || 'Not Playing'}`, true)
                .addField("Flags", `${cachedUserFlags.length ? cachedUserFlags.map(flag => flags[flag]).join(" **|** ") : 'None'}`)
                .addField("Roles", `${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles!"}`, true)
                .addField("Joined Discord At", userCached.createdAt)
                .setFooter(`Information about ${userCached.username}`)
                .setTimestamp()
    
            message.channel.send(userInfoEmbed);
  }
};
