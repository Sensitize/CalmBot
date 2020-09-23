const application = (client, message) => {
    message.channel.send(":green_circle: STATUS: OPEN :green_circle: \n \nIf you are needing the requirements, please head to "+message.guild.channels.cache.find(channel => channel.name === "info").toString()+" as they are stated there. \n\n However, they are also on our application below :) \n **APPLICATION** \n <https://forms.gle/tLkAkPJ8qEuCFVe16>") 
}
module.exports = application;