const { SlashCommandBuilder } = require('discord.js');
const { loadTheories, getTopTheories } = require('../utils/database');


// /theorytop (List top 3 theories by votes)
module.exports.theorytop = {
  data: new SlashCommandBuilder()
    .setName('theorytop')
    .setDescription('List the top 3 theories by votes.'),
  async execute(interaction) {
    const topTheories = getTopTheories();
    const response = `**Top Theories**\n${topTheories.map(t => `${t[0]}: ${t[1].votes} 🐳`).join('\n')}`;
    await interaction.reply(response);
  },
};