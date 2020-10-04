const { Command } = require('discord.js-commando');
const { getPlayer } = require('../../requests/hypixel.js');
const roles = require('../../data/calm/roles.json');
const { removeRole, setRole } = require('../../requests/role.js');

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
      } else if (player?.socialMedia?.links?.DISCORD !== message.author.tag) {
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

        // remove existing roles
        for (const category in roles) {
          if (category === 'guild') continue;
          for (const role in roles[category]) {
            removeRole(message, role);
          }
        }

        // calculates player's network level from network exp
        const exp = player.networkExp;
        const BASE = 10000;
        const GROWTH = 2500;
        const HALF_GROWTH = 0.5 * GROWTH;
        const REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
        const REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
        const GROWTH_DIVIDES_2 = 2 / GROWTH;
        const networkLevel = Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * exp));

        // gets ap from api
        const ap = player.achievementPoints;

        // gets bedwars prestige
        const BEDWARS_EXP_PER_PRESTIGE = 489000;
        const experience = player.stats?.Bedwars?.Experience;
        const bwPrestige = Math.floor(experience / BEDWARS_EXP_PER_PRESTIGE);

        // gets sw Level
        console.log(player?.stats?.SkyWars?.skywars_experience);
        const swLevel = Math.floor(getSwLevel(player?.stats?.SkyWars?.skywars_experience));
        console.log(swLevel);

        // applies the rank role
        if (rank === 'ADMIN') {
          setRole(message, 'Hypixel Staff');
          // not a role in calm guild for some reason
          // setRole(message, 'rank', 'Hypixel Admin');
        } else if (rank === 'MODERATOR') {
          setRole(message, 'Hypixel Staff');
          setRole(message, 'Hypixel Moderator');
        } else if (rank === 'HELPER') {
          setRole(message, 'Hypixel Staff');
          setRole(message, 'Hypixel Helper');
        } else if (rank === 'YOUTUBER') {
          setRole(message, 'Hypixel Youtuber');
        } else if (rank === 'SUPERSTAR') {
          setRole(message, 'Hypixel MVP++');
        } else if (rank === 'MVP_PLUS') {
          setRole(message, 'Hypixel MVP+');
        } else if (rank === 'MVP') {
          setRole(message, 'Hypixel MVP');
        } else if (rank === 'VIP_PLUS') {
          setRole(message, 'Hypixel VIP+');
        } else if (rank === 'VIP') {
          setRole(message, 'Hypixel VIP');
        }

        // applies the network level role
        if (networkLevel >= 250) {
          setRole(message, 'Network Level 250');
        } else if (networkLevel >= 200) {
          setRole(message, 'Network Level 200');
        } else if (networkLevel >= 150) {
          setRole(message, 'Network Level 150');
        } else if (networkLevel >= 95) {
          setRole(message, 'Network Level 95');
        } else if (networkLevel >= 85) {
          setRole(message, 'Network Level 85');
        } else if (networkLevel >= 75) {
          setRole(message, 'Network Level 75');
        } else if (networkLevel >= 65) {
          setRole(message, 'Network Level 65');
        } else if (networkLevel >= 55) {
          setRole(message, 'Network Level 55');
        } else if (networkLevel >= 45) {
          setRole(message, 'Network Level 45');
        } else if (networkLevel >= 35) {
          setRole(message, 'Network Level 35');
        }

        // applies the ap role
        if (ap >= 17000) {
          setRole(message, '17k AP');
        } else if (ap >= 14000) {
          setRole(message, '14k AP');
        } else if (ap >= 11000) {
          setRole(message, '11k AP');
        } else if (ap >= 8000) {
          setRole(message, '8k AP');
        } else if (ap >= 5000) {
          setRole(message, '5k AP');
        } else if (ap >= 2000) {
          setRole(message, '2k AP');
        } else if (ap >= 1000) {
          setRole(message, '1k AP');
        }

        // applies bedwars prestige role
        if (bwPrestige === 10) {
          setRole(message, 'Bedwars Rainbow');
        } else if (bwPrestige === 9) {
          setRole(message, 'Bedwars Amethyst');
        } else if (bwPrestige === 8) {
          setRole(message, 'Bedwars Opal');
        } else if (bwPrestige === 7) {
          setRole(message, 'Bedwars Crystal');
        } else if (bwPrestige === 6) {
          setRole(message, 'Bedwars Ruby');
        } else if (bwPrestige === 5) {
          setRole(message, 'Bedwars Sapphire');
        } else if (bwPrestige === 4) {
          setRole(message, 'Bedwars Emerald');
        } else if (bwPrestige === 3) {
          setRole(message, 'Bedwars Diamond');
        } else if (bwPrestige === 2) {
          setRole(message, 'Bedwars Gold');
        } else if (bwPrestige === 1) {
          setRole(message, 'Bedwars Iron');
        }

        // applies skywars prestge role
        if (swLevel >= 100) {
          setRole(message, 'Skywars Mystic');
        } else if (swLevel >= 50) {
          setRole(message, 'Skywars Rainbow');
        } else if (swLevel >= 45) {
          setRole(message, 'Skywars Amethyst');
        } else if (swLevel >= 40) {
          setRole(message, 'Skywars Opal');
        } else if (swLevel >= 35) {
          setRole(message, 'Skywars Crystal');
        } else if (swLevel >= 30) {
          setRole(message, 'Skywars Ruby');
        } else if (swLevel >= 25) {
          setRole(message, 'Skywars Sapphire');
        } else if (swLevel >= 20) {
          setRole(message, 'Skywars Emerald');
        } else if (swLevel >= 15) {
          setRole(message, 'Skywars Diamond');
        } else if (swLevel >= 10) {
          setRole(message, 'Skywars Gold');
        } else if (swLevel >= 5) {
          setRole(message, 'Skywars Iron');
        }

        message.channel.send('Account successfuly linked!');
      }
    });
  }
};
