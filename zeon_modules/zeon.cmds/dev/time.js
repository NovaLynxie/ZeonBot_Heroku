module.exports.run = (bot, message) => {
    var timeHrs = new Date().getHours();
    var timeMins = new Date().getMinutes();
    var timeSecs = new Date().getSeconds();
    console.log("LocalTime: "+timeHrs+':'+timeMins+':'+timeSecs)
    message.channel.send(timeHrs+':'+timeMins+':'+timeSecs) 
};

module.exports.help = {
    name: "time",
	aliases: ["t"],
	description: "Responds with local time for bot.",
	usage: "time",
	category: "Developer",
};