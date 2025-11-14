const { SlashCommandBuilder } = require('discord.js');
const messages = require('../randomMessages.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('one of the quotes neco says randomly')
        .setContexts(0, 1, 2),

    async execute(interaction) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        await interaction.reply(randomMessage);
    }
};