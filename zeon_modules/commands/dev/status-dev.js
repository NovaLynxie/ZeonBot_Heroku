const { Command } = require('discord.js-commando');

module.exports = class ClientDumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status-dev',
            group: 'dev',
            memberName: 'status-dev',
            description: `Dumps 'client' variable data out into console.`,
            ownerOnly: true
        })
    }
    run(message, client) {
        console.log("[ZEON] Dumping 'message' contents into console...");
        console.log(message);
        console.log("[ZEON] Dumping 'client' contents into console...");
        console.log(client);
        console.log("[ZEON] Data dump successfully completed!");
    }
}