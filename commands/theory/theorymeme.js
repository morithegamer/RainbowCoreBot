const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { saveTheory } = require(path.join(__dirname, '../../utils/database'));


/ /theorymeme (Generate a meme description)
module.exports.theorymeme = {
  data: new SlashCommandBuilder()
    .setName('theorymeme')
    .setDescription('Generate a 2000s-style meme for the last theory.'),
  async execute(interaction) {
    await interaction.reply('**Meme**: YTMND-style GIF with "Docker containers SpongeBob’s brain!"\n*Ask GPT-4 to render via DALL·E!*');
  },
};
