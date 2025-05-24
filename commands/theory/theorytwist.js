const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { saveTheory } = require(path.join(__dirname, '../../utils/database'));


// /theorytwist (Add a random twist)
module.exports.theorytwist = {
  data: new SlashCommandBuilder()
    .setName('theorytwist')
    .setDescription('Add a random twist to a theory.'),
  async execute(interaction) {
    const twists = ['But Docker’s AI escaped to Xanga!', 'But the container was alien tech!', 'But NASA hid it in MySpace!'];
    await interaction.reply(`**Twist**: ${twists[Math.floor(Math.random() * twists.length)]}`);
  },
};
