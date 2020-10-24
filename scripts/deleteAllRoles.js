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

    guild.roles.cache.forEach((role, i) => {
      if(role.name !== 'new role') return

      role.delete()
        .then(() => console.log(`Deleted role: ${role.name}`))
    });
  });
});

bot.login(process.env.BOT_TOKEN);
