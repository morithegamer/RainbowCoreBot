require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
for (const moduleFolder of fs.readdirSync(commandsPath)) {
  const modulePath = path.join(commandsPath, moduleFolder);
  if (fs.lstatSync(modulePath).isDirectory()) {
    for (const file of fs.readdirSync(modulePath).filter(f => f.endsWith('.js'))) {
      const filePath = path.join(modulePath, file);
      const command = require(filePath);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      }
    }
  }
}

client.once(Events.ClientReady, c => {
  console.log(`✅ RainbowCoreBot is online as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: '⚠️ There was an error executing this command.', ephemeral: true });
    } else {
      await interaction.reply({ content: '⚠️ There was an error executing this command.', ephemeral: true });
    }
  }
});

client.login(process.env.BOT_TOKEN);
