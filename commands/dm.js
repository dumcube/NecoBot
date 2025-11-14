// dmCommand.js
const { SlashCommandBuilder } = require('discord.js');

const OWNER_ID = '540438259436748811';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('send direct message (DUM only)')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('target')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('message')
        .setDescription('message to send')
        .setRequired(true)
    )
    .setContexts(0) // 0 = servers only, to avoid spam from group DMs
    .toJSON(),

  async execute(interaction) {
    // Check if the user is the bot owner
    if (interaction.user.id !== OWNER_ID) {
      return await interaction.reply({
        content: 'this command is restricted to DUM',
        ephemeral: true
      });
    }

    const user = interaction.options.getUser('user');
    const msg = interaction.options.getString('message');

    try {
      await user.send(msg);
      await interaction.reply(`sent dm to **${user.tag}** nya`);
    } catch (err) {
      await interaction.reply('⚠️ DM DID NOT WORK ⚠️');
    }
  }
};
