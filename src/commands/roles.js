const roles = (client, message) => {
    message.channel.send("You want some more roles? Go give yourself some in "+message.guild.channels.cache.find(channel => channel.name === "self-assign-roles").toString()+" !! <3")
}

module.exports = roles;