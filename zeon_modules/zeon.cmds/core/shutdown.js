module.exports.run = (bot, message) => {
    console.log("[ZeonBot] SHUTDOWN command received! Shutting down now!")
    message.channel.send("Command received. Terminating systems...")
    //.then(bot.user.setStatus("dnd"))
    //.then(bot.user.setActivity("shutting down..."))
    .then(_msg=>bot.destroy());
};

module.exports.help = {
    name: "shutdown",
    aliases: ["deactivate"], 
    description: "Shuts down the bot and disconnects it from discord.",
    usage: "shutdown",
    category: "Core",
};
