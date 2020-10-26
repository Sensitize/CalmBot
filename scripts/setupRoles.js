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
  rl.question("Enter the ID of the guild you would like to setup: ", async (id) => {
    const guild = await bot.guilds.fetch(id);

    for (const categoryName in roles) {
      for (const roleName in roles[categoryName]){
        guild.roles.create({ data: { name: roles[categoryName][roleName].name } })
          .then((role) => console.log(`Created role: ${role.name}`))
          .catch(console.error);
      }
    }
  });
});

bot.login(process.env.BOT_TOKEN);