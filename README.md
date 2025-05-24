# 🌈 RainbowCoreBot

A powerful and chaotic Discord bot created by **Mori** 💙🐾  
Combines wild theory generation with Steam account integration for a modular, multi-purpose experience.

---

## 📦 Features

### 🎭 TheoryCraft Module
- `/theory` – Generates wild AI conspiracies
- `/theorysave`, `/theoryvault`, `/theoryedit`, `/theorydelete` – Save and manage your lore
- `/theoryrank`, `/theorytop` – Show who’s ruling the conspiracy charts

### 🎮 SteamLink Module
- `/registersteam` – Link your Steam ID
- `/mystats`, `/librarycount`, `/mostplayed`, `/gametime` – View your Steam life
- `/compare` – Compare Steam libraries
- `/randomgame`, `/wishlist`, `/tradingcard` – Discover, meme, and flex

---

## 🚀 Setup

```bash
npm install
```

Create a `.env` file with:

```
BOT_TOKEN=your_discord_bot_token
OPENAI_API_KEY=your_openai_api_key
STEAM_API_KEY=your_steam_web_api_key
```

Then run:

```bash
node deploy-commands.js
node index.js
```

---

## 📂 Structure

```
commands/
├── steam/         # SteamLink commands
├── theory/        # TheoryCraft commands
data/              # Stores saved theories and linked Steam users
utils/             # Shared utility logic
.env               # API keys
```

---

## 💙 Credits

- Made by **Mori** the Rainbow Fox 🦊🌈
- Assisted by ChatGPT, the splash screen therapist
- Powered by: Discord.js · OpenAI · Steam Web API

---

## 📄 License

MIT — Free to use, fork, remix, and meme.
