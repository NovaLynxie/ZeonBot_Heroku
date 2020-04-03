const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge-dev',
            aliases: ['clear-dev','prune-dev','delete-dev'],
            group: 'admin',
            memberName: 'purge-dev',
            guildOnly: true,
			description: 'Deletes the last message(s) in the chat the command is run in.',
			ownerOnly: true
		});
		
    }
    async run(message, args) {
        //const args = message.content.split(' '); //disabled as args is already defined following restructure
		let deleteCount = 0;
		try {
			deleteCount = parseInt(args[1], 10);
		}catch(err) {
			return message.reply('Please provide the number of messages to delete. (max 100)')
		}
        
		if (!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
		const fetched = await message.channel.fetchMessages({
			limit: deleteCount,
		});
		console.log("[ClearMsg] Purging "+fetched.deleteCount+" messages...")
		message.channel.bulkDelete(fetched)
			.catch(error => {
				console.log('[ClearMsg] ERROR! Unable to remove messages!')
				console.error(error)
				message.reply(`Couldn't delete messages because of: ${error}`)
			});
		console.log("[ClearMsg] Messages removed successfully!")
    }
}