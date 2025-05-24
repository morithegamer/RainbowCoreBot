const { SlashCommandBuilder } = require('discord.js');
const { loadTheories, getTopTheories } = require('../utils/database');


// /theoryprompt (Interactive theory creation)
module.exports.theoryprompt = {
  data: new SlashCommandBuilder()
    .setName('theoryprompt')
    .setDescription('Interactively create a theory via DMs.'),
  async execute(interaction) {
    await interaction.reply({ content: 'Check your DMs to craft a theory!', ephemeral: true });
    const user = interaction.user;
    await user.send('Topic? (e.g., SpongeBob, Docker)');
    // Implement DM collector logic (simplified for brevity)
    await user.send('Era? (1990s, 2000s, 2010s)');
    await user.send('Genre? (political, creepy, silly)');
    await user.send('Theory generated! Use /theory for now.');
  },
};