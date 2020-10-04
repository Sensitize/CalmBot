module.exports = async function ready(client) {
  console.log(`${client.user.tag} is serving ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
  client.user.setActivity(`prefix "${client.commandPrefix}"`, { type: 'LISTENING' });
};
