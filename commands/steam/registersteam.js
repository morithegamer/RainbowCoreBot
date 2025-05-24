const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const steamDataPath = path.join(__dirname, '../../data/steam_users.json');

function loadSteamUsers() {
  try {
    return JSON.parse(fs.readFileSync(steamDataPath, 'utf8')) || {};
  } catch {
    return {};
  }
}

function saveSteamUsers(data) {
  fs.writeFileSync(steamDataPath, JSON.stringify(data, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('registersteam')
    .setDescription('Register your Steam ID (64-bit) for stats commands.')
    .addStringOption(option =>
      option.setName('steamid')
        .setDescription('Your SteamID64 (e.g., 76561198000000000)')
        .setRequired(true)),
  async execute(interaction) {
    const steamId = interaction.options.getString('steamid');
    const userId = interaction.user.id;

    const users = loadSteamUsers();
    users[userId] = steamId;
    saveSteamUsers(users);

    await interaction.reply({ content: `Steam ID registered successfully for <@${userId}>!`, ephemeral: true });
  },
};