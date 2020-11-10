const { Command } = require('discord.js-commando');
const seedrandom = require('seedrandom');

module.exports = class ShipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ship',
      group: 'fun',
      memberName: 'ship',
      description: 'Returns a compatability percentage for two players!',
      examples: [`${client.commandPrefix}ship User1 User2`],
//       args: [
//         {
//           key: 'person1',
//           prompt: 'Whats the name of a person you wanna ship',
//           type: 'user',
//         },
//         {
//           key: 'person2',
//           prompt: 'Whats the name of another person you wanna ship',
//           type: 'user',
//         },
//       ],
    });
  }

  async run(message, { person1, person2 }) {


    message.channel.send("This command is disabled, sorry!");
    return;

    let combined = '';
    if (parseInt(person1.discriminator, 10) > parseInt(person2.discriminator, 10)) {
      combined = person1.username + person2.username;
    } else {
      combined = person2.username + person1.username;
    }

    const date = new Date().getDate().toString();
    const rng = Math.floor(seedrandom(combined + date).quick() * 100);
    message.say(`\`${person1.username}\` and \`${person2.username}\` are **${rng}%** compatible!`);
  }
};
