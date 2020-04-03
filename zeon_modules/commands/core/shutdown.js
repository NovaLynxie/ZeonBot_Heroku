const { Command } = require('discord.js-commando');

module.exports = class ShutdownCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            aliases: ['sleep', 'deactivate'],
            group: 'core',
            memberName: 'shutdown',
            description: 'Shuts down the bot and disconnects it from discord.',
            ownerOnly: true,
        });
    }
    run(message) {
        console.log("[Zeon] Shutdown command received!")
        //message.channel.send("Good night... <:sleepycat:635163563878514688>")
        message.say("Deactivating systems. Goodnight :wave:")
            .then(console.log("[Zeon] Deactivating systems. Goodbye."))
            .then(_msg => this.client.user.setStatus('invisible'))
            .then(_msg => this.client.destroy())
            .then(_msg => process.exit());
    }
}