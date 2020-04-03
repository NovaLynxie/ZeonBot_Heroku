const { Command } = require('discord.js-commando');

module.exports = class MsgDumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'msgdump',
            group: 'dev',
            memberName: 'msgdump',
            description: `Dumps 'message' variable data out into console.`,
            ownerOnly: true
        })
    }
    run(message) {
        console.log('Dumping contents into console...');
        console.log(message);
    }
}