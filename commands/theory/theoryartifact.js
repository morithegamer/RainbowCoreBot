const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { saveTheory } = require(path.join(__dirname, '../../utils/database'));


// /theoryartifact (Generate a fake artifact)
module.exports.theoryartifact = {
  data: new SlashCommandBuilder()
    .setName('theoryartifact')
    .setDescription('Generate a lost media artifact for a theory.'),
  async execute(interaction) {
    const artifacts = ['MiniDV tape', 'VCD', 'Betamax', '.swf file'];
    await interaction.reply(`**Artifact**: A ${artifacts[Math.floor(Math.random() * artifacts.length)]} with a glitched Docker logo, labeled "NASA Classified."`);
  },
};
