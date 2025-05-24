const { SlashCommandBuilder } = require('discord.js');

const cards = [
  { name: 'Cardboard Sniper', game: 'CS:GO', rarity: 'Common', emoji: '🎯' },
  { name: 'Steam Summer Badge', game: 'Steam Event 2021', rarity: 'Rare', emoji: '🔥' },
  { name: 'Pixel Pup', game: 'Indie Paws', rarity: 'Epic', emoji: '🐶' },
  { name: 'VHS Hacker', game: 'HackZone', rarity: 'Legendary', emoji: '💾' },
  { name: 'Silly Duck', game: 'Untitled Bird Game', rarity: 'Common', emoji: '🦆' },
  { name: 'Arcade Ghoul', game: 'Neon Graveyard', rarity: 'Rare', emoji: '👾' },
  { name: 'Rainbow Fox', game: 'Furry Royale', rarity: 'Mythic', emoji: '🌈🦊' }
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tradingcard')
    .setDescription('Receive a random Steam-style trading card.'),
  async execute(interaction) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    await interaction.reply(`You got a **${card.rarity}** card! ${card.emoji}\n**${card.name}** from *${card.game}*`);
  },
};
