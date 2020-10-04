const roles = require('../data/calm/roles.json');

function getRole(message, rolename) {
  if (message.guild.id === '501501905508237312') {
    let id;
    for (const category in roles) {
      for (const role in roles[category]) {
        id = roles[category][role];
      }
    }

    return message.guild.roles.cache.find((r) => r.id === id);
  } else {
    return message.guild.roles.cache.find((r) => r.name === rolename);
  }
}

function setRole(message, rolename) {
  const role = getRole(message, rolename);

  if (role) {
    message.member.roles.add(role);
  }
}

function removeRole(message, rolename) {
  const role = getRole(message, rolename);

  if (role) {
    message.member.roles.remove(role);
  }
}

module.exports = { getRole, setRole, removeRole };
