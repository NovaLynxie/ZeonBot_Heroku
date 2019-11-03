module.exports = {
    name: 'poke',
    description: "Pokes Cora. Hey that tickles!",
    aliases: ['tap', 'nudge'],
    usage: 'poke',
    cooldown: 5,
    guildOnly: false,
    execute(message) {
        message.channel.send("<a:pawingcat:635163464905523221> "+message.author.toString())
    }
};

module.exports.run = (bot, message) => {

};

module.exports.help = {
    name: "poke",
	aliases: ["nudge", "tap"],
	description: "Gives Zeon a nudge.",
	usage: "poke",
	category: "Misc",
};