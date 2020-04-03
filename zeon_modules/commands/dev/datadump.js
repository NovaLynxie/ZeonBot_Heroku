const { Command } = require('discord.js-commando');

module.exports = class DataDumpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'datadump',
            group: 'dev',
            memberName: 'datadump',
            description: 'Dumps data out into console.',
            ownerOnly: true

        })
    }
}