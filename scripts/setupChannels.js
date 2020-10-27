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
  rl.question("Enter the ID of the guild you would like to setup: ", async (id) => {
    const guild = await bot.guilds.fetch(id);

    for (const categoryName in channels) {
      guild.channels.create(categoryName, { type: 'category' })
        .then((category) => {
          console.log(`Created category: ${category.name}`);

          for (const channelName in channels[categoryName]) {
            const textchannel = channels[categoryName][channelName].name;
            guild.channels.create(textchannel, { type: 'text' })
              .then((channel) => {
                console.log(`Created channel: ${channel.name}`);

                // channel.send('first');

                channel.setParent(category.id)
                  .then(() => console.log(`Added ${channel.name} to ${category.name}`))
                  .catch(console.error);
              })
              .catch(console.error);
          } 
        })
        .catch(console.error);
    }
  })
});

bot.login(process.env.BOT_TOKEN);