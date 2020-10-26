const roles = require('../data/calm/roles.json');

async function getRole(guild, categoryName, roleName) {
  if (guild.id === '501501905508237312') {
    const id = roles[categoryName][roleName].id;
    return guild.roles.cache.find((r) => r.id === id);
  } else {
    const name = roles[categoryName][roleName].name;
    return guild.roles.cache.find((r) => r.name === name);
  }
}

async function setRole(member, categoryName, roleName) {
  if (member.guild.id === '501501905508237312') {
    const id = roles[categoryName][roleName].id;
    member.roles.add(id)
      .catch(console.error);
  } else {
    const name = roles[categoryName][roleName].name;

    const role = await member.guild.roles.cache.find((r) => r.name === name);

    if (role) {
      member.roles.add(role)
        .catch(console.error);
    } else {
      console.log('Role not found');
      console.log(name);
    }

  }
}

async function removeRole(member, categoryName, roleName) {
  if (member.guild.id === '501501905508237312') {
    const id = roles[categoryName][roleName].id;
    member.removeRole(id)
      .catch(console.error);
  } else {
    const name = roles[categoryName][roleName].name;
    const role = await member.guild.roles.cache.find((r) => r.name === name);
    member.removeRole(role)
      .catch(console.error);
  }
}

async function iterateRoles(fn) {
  for (const categoryName in roles) {
    for (const roleName in roles[categoryName]) {
      const properties = roles[categoryName][roleName];

      fn(properties); 

    }
  }
}

module.exports = { getRole, setRole, removeRole };
