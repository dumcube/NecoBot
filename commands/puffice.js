const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('puffice')
        .setDescription('neco sends puffice emoji')
        .setContexts(0, 1, 2),

    async execute(interaction) {
        await interaction.reply('<:puffice:1329814988851904512>');
    }
};
