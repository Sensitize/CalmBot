require('dotenv').config();

const readline = require('readline');
const Discord = require('discord.js');
const channels = require('../src/data/calm/channels.json');

const bot = new Discord.Client();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

bot.on('ready', () => {
  rl.question("Enter the ID of the guild you would like to delete the channels of: ", async (id) => {
    const guild = await bot.guilds.fetch(id);

    const channelNames = Object.keys(channels);
    for (const categoryName in channels) {
      for (const channelName in channels[categoryName]) {
        channelNames.push(channels[categoryName][channelName].name);
      }
    }

    guild.channels.cache.forEach((channel, i) => {
      if (channelNames.includes(channel.name)) {
        channel.delete()
          .then(() => console.log(`Deleted channel: ${channel.name}`))
          .catch(console.error);
      }
    });
  });
});

bot.login(process.env.BOT_TOKEN);
