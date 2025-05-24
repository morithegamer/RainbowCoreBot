const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/theories.json');

function loadTheories() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8')) || {};
  } catch {
    return {};
  }
}

function saveTheories(theories) {
  fs.writeFileSync(dbPath, JSON.stringify(theories, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('theorydelete')
    .setDescription('Delete a saved theory.')
    .addStringOption(option => option.setName('id').setDescription('Theory ID to delete').setRequired(true)),
  async execute(interaction) {
    const id = interaction.options.getString('id');
    const theories = loadTheories();

    if (!theories[id]) {
      await interaction.reply({ content: `No theory found with ID "${id}".`, ephemeral: true });
      return;
    }

    delete theories[id];
    saveTheories(theories);
    await interaction.reply(`🗑️ Deleted theory with ID: **${id}**`);
  },
};