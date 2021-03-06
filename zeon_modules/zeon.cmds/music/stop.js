module.exports.run = (bot, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!message.member.voiceChannel) {
      console.log("[ZeonBot] Music.Stop Error! UserNotFound_voicechat.channelNoUser")
      return message.channel.send('You have to be in a voice channel to stop the music!')};
  if (!serverQueue) {
      console.log("[ZeonBot] Music.Stop Error! StopErr_voicechat.channelQueue.Stop")
      return message.channel.send("Nothing is playing. No songs in queue.");
  }
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  message.channel.send(":octagonal_sign: Music Stopped!")
};

module.exports.help = {
  name: "stop",
  description: "Stops the currently playing song and disconnects the bot from vc channel.",
  usage: "stop",
  category: "music",
  aliases: ["finish", "end"],
  guildOnly: true
};
