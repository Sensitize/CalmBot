// Loads environment variables from .env to setup development environment
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
  commandPrefix: 'c!',
  owner: ['438057670042320896', '272172704243908609'],
});

const evtFiles = fs.readdirSync(path.join(__dirname, 'events'));
console.log(`Loading a total of ${evtFiles.length} events.`);

evtFiles.forEach((file, i) => {
  if (!file.endsWith('.js')) return;

  const evtName = file.split('.')[0];
  const evt = require('./events/' + file);

  // Loads evt
  client.on(evtName, (...args) => {
    evt(client, ...args);
  });
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['img', 'Image Commands'],
    ['fun', 'Fun Commands'],
    ['util', 'Utility Commands'],
    ['info', 'Info Commands'],
    ['admin', 'Admin Commands'],
  ])
  .registerCommandsIn({
    filter: /^([^.].*)\.js$/,
    dirname: path.join(__dirname, 'commands'),
  });

client.login(process.env.BOT_TOKEN);