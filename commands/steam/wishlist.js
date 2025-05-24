const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wishlist')
    .setDescription('📜 Show your top Steam wishlist games (mock data).'),
  async execute(interaction) {
    const mockWishlist = [
      'Hollow Knight: Silksong',
      'Half-Life 3',
      'Portal 3',
      'The Elder Scrolls VI',
      'Left 4 Dead 3'
    ];

    const formatted = mockWishlist.map((g, i) => `${i + 1}. ${g}`).join('\n');
    await interaction.reply(`🛒 **Your Wishlist:**\n${formatted}`);
  },
};