const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const generator = require(path.join(__dirname, '../../utils/theoryGenerator'));
const { saveTheory } = require(path.join(__dirname, '../../utils/database'));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('theory')
    .setDescription('Generate a creepy Docker-NASA-SpongeBob conspiracy theory.')
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('Topic (e.g., SpongeBob, Toontown)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('era')
        .setDescription('Era (1990s, 2000s, 2010s)')
        .setRequired(false)
        .addChoices(
          { name: '1990s', value: '1990s' },
          { name: '2000s', value: '2000s' },
          { name: '2010s', value: '2010s' },
        ))
    .addStringOption(option =>
      option.setName('genre')
        .setDescription('Genre (political, creepy, silly)')
        .setRequired(false)
        .addChoices(
          { name: 'Political', value: 'political' },
          { name: 'Creepy', value: 'creepy' },
          { name: 'Silly', value: 'silly' },
        )),
  async execute(interaction) {
    await interaction.deferReply();
    const topic = interaction.options.getString('topic') || 'SpongeBob';
    const era = interaction.options.getString('era') || '2000s';
    const genre = interaction.options.getString('genre') || 'creepy';

    try {
      const theory = await generateTheory(topic, era, genre);
      const theoryId = `Theory_${Date.now()}`;
      await saveTheory(theoryId, theory.text);
      await interaction.editReply({
        content: `**${theory.title}**\n${theory.text}\n*React 🐳 to save to the Theory Vault! Want a meme? Type \`/theorymeme\`.*`,
      });
    } catch (error) {
      await interaction.editReply({ content: 'Error spinning theory! Try again.', ephemeral: true });
    }
  },
};
