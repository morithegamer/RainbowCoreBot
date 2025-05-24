const { SlashCommandBuilder } = require('discord.js');
const { loadTheories, getTopTheories } = require('../utils/database');

// /theorysave (Save a theory to a vault channel)
module.exports.theorysave = {
  data: new SlashCommandBuilder()
    .setName('theorysave')
    .setDescription('Save a theory to the vault channel.')
    .addStringOption(option =>
      option.setName('theoryid')
        .setDescription('The theory ID to save')
        .setRequired(true)),
  async execute(interaction) {
    const theoryId = interaction.options.getString('theoryid');
    const theories = loadTheories();
    if (theories[theoryId]) {
      const vaultChannel = interaction.guild.channels.cache.find(ch => ch.name === 'theory-vault');
      if (vaultChannel) {
        await vaultChannel.send(`**Saved ${theoryId}**\n${theories[theoryId].text}`);
        await interaction.reply(`Saved to #theory-vault!`);
      } else {
        await interaction.reply({ content: 'No #theory-vault channel found!', ephemeral: true });
      }
    } else {
      await interaction.reply({ content: 'Theory not found! Spin a new one with /theory.', ephemeral: true });
    }
  },
};