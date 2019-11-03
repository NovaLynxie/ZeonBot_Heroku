const ytdl = require('ytdl-core');
module.exports.run = async (bot, message, args) => {
	const queue = message.client.queue;
	const serverQueue = message.client.queue.get(message.guild.id);

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) {
		console.log("[ZeonBot] Permissions Error! TargetChannel_voicechat.channelNotSpecified")
		return message.channel.send('I need a voicechannel to play music!');}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		console.log("[ZeonBot] Permissions Error! InsufficientPerms_voicechat.channelPermsErr")
		return message.channel.send("Insufficient permissions for users channel! Check bot and channel's permissions!");
	};

	const songInfo = await ytdl.getInfo(args[0]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);
		queueContruct.songs.push(song);
		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			const execute = `play`
			runtime = bot.commands.get(execute); //Fix bypass to allow play to work correctly.
			runtime.play(message, queueContruct.songs[0])
			//this.play(message, queueContruct.songs[0]); //This doesn't work, unsure why.
			console.log("Connected! Playing song...")
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		};
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(`${song.title} has been added to the queue!`);
	};

	/* //Disabled as this is not working. Patch workaround applied.
	play(message, song); {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);
		
		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
	
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0]);
			})
			.on('error', error => {
				console.error('[ZeonBot] Dispatcher Error!',error);
			});
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	}
	*/
};

module.exports.play = (message, song) => {
	const queue = message.client.queue;
	const guild = message.guild;
	const serverQueue = queue.get(message.guild.id);
	
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			serverQueue.songs.shift();
			this.play(message, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error('[ZeonBot] Dispatcher Error!',error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

module.exports.help = {
  	name: "play",
  	description: "Joins the user's vc channel and plays the song requested. Only plays YouTube URLs!",
  	usage: "play <url> [YouTube URL]",
  	category: "music",
  	aliases: ["sing", "add"],
	cooldown: 1,
	guildOnly: true,
};
