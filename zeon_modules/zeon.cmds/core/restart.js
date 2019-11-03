module.exports.run = (bot, message) => {
    console.log("[ZeonBot] RESTART command received! Restarting now!")
    message.channel.send("Command received. Restarting systems...")
    //.then(bot.user.setStatus("dnd"))
    //.then(bot.user.setActivity("rebooting..."))
    .then(_msg=>bot.destroy())
    .then(()=>bot.login(bot.config.token));
};

module.exports.help = {
    name: "restart",
    aliases: ["reboot", "reset"],
    description: "Restarts the bot and allows the bot to relog.",
    usage: "restart",
    category: "Core",
};
