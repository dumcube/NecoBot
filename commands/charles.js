const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charles')
        .setDescription('my name is charles leclerc')
        .setContexts(0, 1, 2) // 0 = servers, 1 = DMs, 2 = group DMs
        .toJSON(),

    async execute(interaction) {
        const imageUrl = 'https://cdn.discordapp.com/attachments/1220121365122650122/1438813182440243292/image.png?ex=69183eb2&is=6916ed32&hm=ec2f2887cbfe86b7b5c665d9e06ceb58ccdc6d7fbfddee8a84b3c3b3aaff0f39&';
        await interaction.reply(imageUrl);
    }
};
