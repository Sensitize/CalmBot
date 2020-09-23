const vouch = (client, message) => {
    message.channel.send("**Vouch System**\n\nTo be eligable to vouch a member into Calm, you must be Trusted+.\nTo be vouched into Calm, you must be no lower than Hypixel level 65.\n\nEach rank below gets the number of vouches listed PER MONTH.\n\nTrusted: 3\nLoyal: 4\nOG: 5\nGuild Staff: 6\n\n*If you have any questions, please do t!open in #commands to open a ticket and talk to staff*")
}

module.exports = vouch;