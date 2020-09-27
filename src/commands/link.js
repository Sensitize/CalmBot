const { getPlayer } = require('../requests/hypixel.js');
const roles = require('../data/calm/roles.json');

function getRole(message, rolename) {
  let role;
  if (message.guild.id === '501501905508237312') {
    const id = calmRoles.find((r) => r.name === rolename);
    return message.guild.roles.cache.find((r) => r.id === id);
  } else {
    return message.guild.roles.cache.find((r) => r.name === rolename);
  }
}

function setRole(message, rolename) {
  const role = getRole(message, rolename);

  if (role) {
    message.member.roles.add(role);
  }
}

function removeRole(message, rolename) {
  const role = getRole(message, rolename);

  if (role) {
    message.member.roles.remove(role);
  }
}

async function link(client, message) {
  getPlayer(message.args[0], (err, player) => {
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
      roles.forEach((role, i) => {
        removeRole(message, role.name);
      });

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

      // applies the rank role
      if (rank === 'ADMIN') {
        setRole(message, 'Hypixel Staff');
        // not a role in calm guild for some reason
        // setRole(message, 'Hypixel Admin');
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

      // // applies the ap role
      // if (ap >= 17000) {
      //   setRole(message, '17k AP');
      // } else if (ap >= 14000) {
      //   setRole(message, '14k AP');
      // } else if (ap >= 11000) {
      //   setRole(message, '11k AP');
      // } else if (ap >= 8000) {
      //   setRole(message, '8k AP');
      // } else if (ap >= 5000) {
      //   setRole(message, '5k AP');
      // } else if (ap >= 2000) {
      //   setRole(message, '2k AP');
      // } else if (ap >= 1000) {
      //   setRole(message, '1k AP');
      // }

      message.channel.send('Account successfuly linked!');
    }
  });
}

module.exports = link;
