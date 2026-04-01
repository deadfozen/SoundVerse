import TelegramBot from "node-telegam-bot-api";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
bot.onText(/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Открыть плеер", {
		reply_markup: {
			inline_keyboard: [
				[{text: "Открыть", web_app: {url: "https://soundverseru.vercel.app/"}}]
			]
		}
	});
});
bot.on("audio", async (msg) => {
	const audio = msg.audio;
	await axios.post("http://localhost:3001/track", {
		title: audio.title || "Unknown",
		artist: audio.performer || "Unknown",
		file_id: audio.file_id
	});
	bot.sendMessage(msg.chat.id, "Трек добавлен");
});
