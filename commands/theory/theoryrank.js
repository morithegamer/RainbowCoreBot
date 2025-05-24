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
    .setName('theoryrank')
    .setDescription('Rank users based on theory votes.'),
  async execute(interaction) {
    const theories = loadTheories();
    const userVotes = {};

    for (const id in theories) {
      const theory = theories[id];
      if (theory.votes && theory.author) {
        userVotes[theory.author] = (userVotes[theory.author] || 0) + theory.votes;
      }
    }

    const ranked = Object.entries(userVotes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([user, votes], i) => `#${i + 1} <@${user}> – ${votes} votes`)
      .join('\n') || 'No ranked users yet.';

    await interaction.reply(`🏆 **Top Theory Voters:**\n${ranked}`);
  }
};