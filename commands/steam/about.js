const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('About this bot and credits.'),
  async execute(interaction) {
    await interaction.reply({
      content: `**RainbowCoreBot** 💙\nCreated by Mori the Rainbow Fox.\nModules: TheoryCraft & SteamLink\nPowered by Discord.js, OpenAI, and Steam Web API.`,
      ephemeral: true
    });
  },
};