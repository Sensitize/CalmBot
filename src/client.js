// Loads environment variables from .env to setup development environment
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Discord = require('discord.js');

// promisified to use async/await to avoid callback hell
const readdir = promisify(fs.readdir);

const client = new Discord.Client();

client.settings = {
  prefix: 'c!',
};

(async () => {
  // Features (functionality beyond commands)
  client.features = {
    countToChannel: false, // disabled because it needs to be reworked
    mentionSomeone: false, // disabled because lmao
  };

  // Event Loader
  const evtFiles = await readdir(path.join(__dirname, 'events'));
  console.log(`Loading a total of ${evtFiles.length} events.`);

  // Loops through ./events folder's files
  evtFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const evtName = file.split('.')[0];
    const evt = require('./events/' + file);

    // Loads evt
    client.on(evtName, (...args) => {
      evt(client, ...args);
    });
  });

  // Command Loader
  const cmdFiles = await readdir(path.join(__dirname, 'commands'));
  console.log(`Loading a total of ${cmdFiles.length} commands.`);

  client.commands = {};

  // Loops through ./commands folder's files
  cmdFiles.forEach((file) => {
    if (!file.endsWith('.js')) return;

    const cmdName = file.split('.')[0];

    // Loads each command function in ./commands into memory that can be accessed from the client object.
    client.commands[cmdName] = require(`./commands/${file}`);
  });

  // Login
  client.login(process.env.DISCORD_TOKEN);
})();
