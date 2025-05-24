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

module.exports = {
  data: new SlashCommandBuilder()
    .setName('theoryvault')
    .setDescription('List all saved theories.'),
  async execute(interaction) {
    const theories = loadTheories();
    const list = Object.entries(theories).map(([id, t]) => `**${id}**: ${t.text.slice(0, 100)}...`).join('\n') || 'No theories saved.';
    await interaction.reply({ content: `📚 **Saved Theories:**\n${list}`, ephemeral: true });
  },
};