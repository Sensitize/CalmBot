const request = require('request');
const role = require('../src/methods/role.js');

const link = (client, message) => {
  // Verify arguments
  if (!message.args[0]) {
    return message.channel.send('you gotta put your minecraft username as the argument');
  }

  const username = message.args[0];

  request({ json: true, url: `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&name=${username}` }, (req, res, body) => {
    if (!body.success) {
      return message.channel.send('The request has failed for some reason!');
    }

    if (body.player === null) {
      return message.channel.send('That account doesnt even exist!');
    }

    // null propegation operator ensures it wont throw a referenceerror
    if (body?.player?.socialMedia?.links?.DISCORD !== message.author.tag) {
      return message.channel.send(`You have to link your Discord account to Hypixel`);
    }

    const player = body.player;

    // remove previous roles
    role.selfRemoveBulk(message, [
      'Hypixel Admin',
      'Hypixel Moderator',
      'Hypixel Helper',
      'Hypixel Youtuber',
      'Hypixel MVP++',
      'Hypixel MVP+',
      'Hypixel MVP',
      'Hypixel VIP+',
      'Hypixel VIP',
      'Network Level 250+',
      'Network Level 200+',
      'Network Level 150+',
      'Network Level 95+',
      'Network Level 85+',
      'Network Level 75+',
      'Network Level 65+',
      'Network Level 55+',
      'Network Level 45+',
      'Network Level 35+',
      '17k+ AP',
      '14k-16k AP',
      '11k-13k AP',
      '8k-10k AP',
      '5k-7k AP',
      '2k-4k AP',
      'Hypixel Staff',
      'Linked',
    ]);

    // goes through api to find the correct rank
    let rank = '';
    if (player.rank && player.rank !== 'NORMAL') {
      rank = player.rank;
    } else if (player.monthlyPackageRank && player.monthlyPackageRank !== 'NONE') {
      rank = player.monthlyPackageRank;
    } else if (player.newPackageRank && player.newPackageRank !== 'NONE') {
      rank = player.newPackageRank;
    } else if (player.packageRank && player.packageRank !== 'NONE') {
      rank = player.packageRank;
    } else {
      rank = 'NON';
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

    // applies the rank role
    if (rank === 'ADMIN') {
      role.add(message, 'Hypixel Staff');
      role.add(message, 'Hypixel Admin');
    } else if (rank === 'MODERATOR') {
      role.add(message, 'Hypixel Staff');
      role.add(message, 'Hypixel Moderator');
    } else if (rank === 'HELPER') {
      role.add(message, 'Hypixel Staff');
      role.add(message, 'Hypixel Helper');
    } else if (rank === 'YOUTUBER') {
      role.add(message, 'Hypixel Youtuber');
    } else if (rank === 'SUPERSTAR') {
      role.add(message, 'Hypixel MVP++');
    } else if (rank === 'MVP_PLUS') {
      role.add(message, 'Hypixel MVP+');
    } else if (rank === 'MVP') {
      role.add(message, 'Hypixel MVP');
    } else if (rank === 'VIP_PLUS') {
      role.add(message, 'Hypixel VIP+');
    } else if (rank === 'VIP') {
      role.add(message, 'Hypixel VIP');
    }

    // applies the network level role
    if (networkLevel >= 250) {
      role.add(message, 'Network Level 250+');
    } else if (networkLevel >= 200) {
      role.add(message, 'Network Level 200+');
    } else if (networkLevel >= 150) {
      role.add(message, 'Network Level 150+');
    } else if (networkLevel >= 95) {
      role.add(message, 'Network Level 95+');
    } else if (networkLevel >= 85) {
      role.add(message, 'Network Level 85+');
    } else if (networkLevel >= 75) {
      role.add(message, 'Network Level 75+');
    } else if (networkLevel >= 65) {
      role.add(message, 'Network Level 65+');
    } else if (networkLevel >= 55) {
      role.add(message, 'Network Level 55+');
    } else if (networkLevel >= 45) {
      role.add(message, 'Network Level 45+');
    } else if (networkLevel >= 35) {
      role.add(message, 'Network Level 35+');
    }

    // applies the ap role
    if (ap >= 17000) {
      role.add(message, '17k+ AP');
    } else if (ap >= 14000) {
      role.add(message, '14k-16k AP');
    } else if (ap >= 11000) {
      role.add(message, '11k-13k AP');
    } else if (ap >= 8000) {
      role.add(message, '8k-10k AP');
    } else if (ap >= 5000) {
      role.add(message, '5k-7k+ AP');
    } else if (ap >= 2000) {
      role.add(message, '2k-4k AP');
    }

    // Important!
    role.add(message, 'Linked');

    message.channel.send('Roles added!');
  });
};

module.exports = link;
