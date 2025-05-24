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
    .setName('theoryedit')
    .setDescription('Edit a saved theory by ID.')
    .addStringOption(option => option.setName('id').setDescription('Theory ID').setRequired(true))
    .addStringOption(option => option.setName('newtext').setDescription('New theory text').setRequired(true)),
  async execute(interaction) {
    const id = interaction.options.getString('id');
    const newText = interaction.options.getString('newtext');
    const theories = loadTheories();

    if (!theories[id]) {
      await interaction.reply({ content: 'No theory found with that ID.', ephemeral: true });
      return;
    }

    theories[id].text = newText;
    saveTheories(theories);
    await interaction.reply(`✏️ Theory **${id}** has been updated.`);
  }
};