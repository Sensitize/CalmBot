const Discord = require('discord.js');
const members = (client, message) => {
    
    const guildMaster = message.guild.roles.cache.find(role => role.name === "Guild Master").members;
    const coOwners = message.guild.roles.cache.find(role => role.name === "Co-Owner").members;
    const staffManagers = message.guild.roles.cache.find(role => role.name === "Staff Managers").members;
    const managers = message.guild.roles.cache.find(role => role.name === "Manager").members;
    const srOfficers = message.guild.roles.cache.find(role => role.name === "Senior Officer").members;
    const officers = message.guild.roles.cache.find(role => role.name === "Officer").members;
    const trials = message.guild.roles.cache.find(role => role.name === "Trial Officer").members;
    const vips = message.guild.roles.cache.find(role => role.id === "709579724862783570").members;
    const trusted = message.guild.roles.cache.find(role => role.name === "Trusted").members;

    const allMembers = message.guild.roles.cache.find(role => role.name === "Guild Members").members;

    let guildMasterName = [];
    let coOwnersNames = [];
    let staffManagersNames = [];
    let managersNames = [];
    let srOfficersNames = [];
    let officersNames = [];
    let trialsNames = [];
    let vipsNames = [];
    let trustedNames = [];
    let memberNames = [];
    
   

    const finishedMembers = [];
    finishedMembers.push("joe257")

    guildMaster.forEach(element => {
        if(element.user.id !== "390217613743226882"){
            console.log(element);
            guildMasterName.push(element.nickname)
            finishedMembers.push(element.nickname)
            console.log(`Guild Master: ${element.user.username}`)
        }
    });
    coOwners.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            coOwnersNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`CO: ${element.user.username}`)
        }
    });

    staffManagers.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            staffManagersNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`SM: ${element.user.username}`)
        }
    });

    managers.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            managersNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`M: ${element.user.username}`)
        }
    });

    srOfficers.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            srOfficersNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`SRO: ${element.user.username}`)
        }
    });

    officers.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            officersNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`O: ${element.user.username}`)
        }
    });

    trials.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            trialsNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`T: ${element.user.username}`)
        }
    });

    vips.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            vipsNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            console.log(`VIP: ${element.user.username}`)
        }
    });

    trusted.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            trustedNames.push(element.user.username)
            finishedMembers.push(element.user.username)
            
        }
    });

    allMembers.forEach(element => {
        if(!finishedMembers.includes(element.user.username) && element.user.id !== "390217613743226882" ){
            memberNames.push(element.user.username)
            finishedMembers.push(element.user.username)
        }
    });


    const channel = message.channel;
    console.log(guildMasterName)
   channel.send(`**Guild Master** ${guildMasterName}\n**Co Owners** ${coOwnersNames}\n**Staff Managers** ${staffManagersNames}\n**Managers** ${managersNames}\n**Sr. Officers** ${srOfficersNames}\n**Officers** ${officersNames}\n**Trials** ${trialsNames}\n**VIPs** ${vipsNames}\n**Trusted** ${trustedNames}\n**Members** ${memberNames}`);


};

module.exports = members;