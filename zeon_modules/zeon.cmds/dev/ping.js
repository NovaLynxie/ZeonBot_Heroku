module.exports.run = (bot, message) => {
    message.channel.send("I am here. `"+bot.ping+"ms`") 
    //This currently does not work and needs to be fixed.
};

module.exports.help = {
    name: "ping",
	aliases: ["respond"],
	description: "Pings Zeon which sends a response and ping time.",
	usage: "ping",
	category: "Developer",
};