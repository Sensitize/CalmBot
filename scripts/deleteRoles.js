require('dotenv').config();

const readline = require('readline');
const Discord = require('discord.js');
const roles = require('../src/data/calm/roles.json');

const bot = new Discord.Client();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

bot.on('ready', () => {
  rl.question("Enter the ID of the guild you would like to delete the roles of: ", async (id) => {
    const guild = await bot.guilds.fetch(id);

    const roleNames = [];
    for (const categoryName in roles) {
      for (const roleName in roles[categoryName]) {
        roleNames.push(roles[categoryName][roleName].name);
      }
    }

    guild.roles.cache.forEach((role, i) => {
      if (roleNames.includes(role.name)) {
        role.delete()
          .then(() => console.log(`Deleted role: ${role.name}`))
          .catch(console.error)
      }
    });
  });
});

bot.login(process.env.BOT_TOKEN);
