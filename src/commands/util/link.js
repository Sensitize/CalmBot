const { Command } = require('discord.js-commando');
const { getPlayer } = require('../../requests/hypixel.js');
const roles = require('../../data/calm/roles.json');
const { removeRole, setRole } = require('../../requests/role.js');
const role = require('../../requests/role.js');

module.exports = class LinkCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'link',
      group: 'util',
      memberName: 'link',
      description: 'Links your account and updates your roles!',
      examples: [`${client.commandPrefix}link [ign]`],
      guildOnly: true,
      args: [
        {
          key: 'ign',
          prompt: 'Please enter your minecraft ign',
          type: 'string',
        },
      ],
    });
  }

  async run(message, { ign }) {
    function getSwLevel(xp) {
      const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
      if (xp >= 15000) {
        return (xp - 15000) / 10000 + 12;
      } else {
        for (let i = 0; i < xps.length; i++) {
          if (xp < xps[i]) {
            return 1 + i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
          }
        }
      }
    }

    getPlayer(ign, (err, player) => {
      if (err) {
        message.channel.send(err);
      } else if (player.socialMedia.links.DISCORD !== message.author.tag) {
        message.channel.send('link discord to hypixel');
      } else {
        // goes through api to find the correct rank
        let rank = '';
        if (player.rank && player.rank !== 'NORMAL') {
          // special ranks
          rank = player.rank;
        } else if (player.monthlyPackageRank && player.monthlyPackageRank !== 'NONE') {
          // mvp++
          rank = player.monthlyPackageRank;
        } else if (player.newPackageRank && player.newPackageRank !== 'NONE') {
          // post eula rank
          rank = player.newPackageRank;
        } else if (player.packageRank && player.packageRank !== 'NONE') {
          // pre eula rank
          rank = player.packageRank;
        } else {
          rank = 'NON';
        }

        const member = message.member;


        member.roles.cache.each((role) => {
            member.roles.remove(role);
        });

        // calculates player's network level from network exp
        const exp = player.networkExp;
        const BASE = 10000;
        const GROWTH = 2500;
        const REVERSE_PQ_PREFIX = (BASE - 0.5 * GROWTH) / GROWTH;
        const REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
        const GROWTH_DIVIDES_2 = 2 / GROWTH;
        const networkLevel = Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));

        // gets ap from api
        const ap = player.achievementPoints;

        // gets bedwars prestige
        const BEDWARS_EXP_PER_PRESTIGE = 489000;
        const experience = player.stats.Bedwars.Experience;
        const bwPrestige = Math.floor(experience / BEDWARS_EXP_PER_PRESTIGE);

        // gets sw Level
        const swLevel = Math.floor(getSwLevel(player.stats.SkyWars.skywars_experience));
        
        // applies the rank role
        if (rank === 'ADMIN') {
          setRole(member, "RANK", "HYPIXEL_STAFF");
          // not a role in calm guild for some reason
          // setRole(member, 'RANK', 'Hypixel Admin');
        } else if (rank === 'MODERATOR') {
          setRole(member, "RANK", "HYPIXEL_STAFF");
          setRole(member, "RANK", "HYPIXEL_MODERATOR");
        } else if (rank === 'HELPER') {
          setRole(member, "RANK", "HYPIXEL_STAFF");
          setRole(member, "RANK", "HYPIXEL_HELPER");
        } else if (rank === 'YOUTUBER') {
          setRole(member, "RANK", "HYPIXEL_YOUTUBER");
        } else if (rank === 'SUPERSTAR') {
          setRole(member, "RANK", "HYPIXEL_MVP++");
        } else if (rank === 'MVP_PLUS') {
          setRole(member, "RANK", "HYPIXEL_MVP+");
        } else if (rank === 'MVP') {
          setRole(member, "RANK", "HYPIXEL_MVP");
        } else if (rank === 'VIP_PLUS') {
          setRole(member, "RANK", "HYPIXEL_VIP+");
        } else if (rank === 'VIP') {
          setRole(member, "RANK", "HYPIXEL_VIP");
        }

        // applies the network level role
        if (networkLevel >= 250) {
          setRole(member, "NETWORK", "250");
        } else if (networkLevel >= 200) {
          setRole(member, "NETWORK", "200");
        } else if (networkLevel >= 150) {
          setRole(member, "NETWORK", "150");
        } else if (networkLevel >= 95) {
          setRole(member, "NETWORK", "95");
        } else if (networkLevel >= 85) {
          setRole(member, "NETWORK", "85");
        } else if (networkLevel >= 75) {
          setRole(member, "NETWORK", "75");
        } else if (networkLevel >= 65) {
          setRole(member, "NETWORK", "65");
        } else if (networkLevel >= 55) {
          setRole(member, "NETWORK", "55");
        } else if (networkLevel >= 45) {
          setRole(member, "NETWORK", "45");
        } else if (networkLevel >= 35) {
          setRole(member, "NETWORK", "35");
        }

        // applies the ap role
        if (ap >= 17000) {
          setRole(member, "AP", "17K");
        } else if (ap >= 14000) {
          setRole(member, "AP", "14K");
        } else if (ap >= 11000) {
          setRole(member, "AP", "11K");
        } else if (ap >= 8000) {
          setRole(member, "AP", "8K");
        } else if (ap >= 5000) {
          setRole(member, "AP", "5K");
        } else if (ap >= 2000) {
          setRole(member, "AP", "2K");
        } else if (ap >= 1000) {
          setRole(member, "AP", "1K");
        }

        // applies bedwars prestige role
        if (bwPrestige === 10) {
          setRole(member, "BW", "RAINBOW");
        } else if (bwPrestige === 9) {
          setRole(member, "BW", "AMETHYST");
        } else if (bwPrestige === 8) {
          setRole(member, "BW", "OPAL");
        } else if (bwPrestige === 7) {
          setRole(member, "BW", "CRYSTAL");
        } else if (bwPrestige === 6) {
          setRole(member, "BW", "RUBY");
        } else if (bwPrestige === 5) {
          setRole(member, "BW", "SAPPHIRE");
        } else if (bwPrestige === 4) {
          setRole(gumemberild, "BW", "EMERALD");
        } else if (bwPrestige === 3) {
          setRole(member, "BW", "DIAMOND");
        } else if (bwPrestige === 2) {
          setRole(member, "BW", "GOLD");
        } else if (bwPrestige === 1) {
          setRole(member, "BW", "IRON");
        }

        // applies skywars prestge role
        if (swLevel >= 100) {
          setRole(member, "SW", "MYSTIC");
        } else if (swLevel >= 50) {
          setRole(member, "SW", "RAINBOW");
        } else if (swLevel >= 45) {
          setRole(member, "SW", "AMETHYST");
        } else if (swLevel >= 40) {
          setRole(member, "SW", "OPAL");
        } else if (swLevel >= 35) {
          setRole(member, "SW", "CRYSTAL");
        } else if (swLevel >= 30) {
          setRole(member, "SW", "RUBY");
        } else if (swLevel >= 25) {
          setRole(member, "SW", "SAPPHIRE");
        } else if (swLevel >= 20) {
          setRole(member, "SW", "EMERALD");
        } else if (swLevel >= 15) {
          setRole(member, "SW", "DIAMOND");
        } else if (swLevel >= 10) {
          setRole(member, "SW", "GOLD");
        } else if (swLevel >= 5) {
          setRole(member, "SW", "IRON");
        }

        message.say('Account successfuly linked!');
      }
    });
  }
};
