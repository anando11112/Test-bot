let GoogleGenerativeAI;

try {
	GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
} catch {
	console.log("Gemini package missing");
}

const genAI = GoogleGenerativeAI
	? new GoogleGenerativeAI(process.env.AIzaSyB3vAe0wL95ySx0E05Vd_IfeTl4T7N5-xo)
	: null;

const model = genAI
	? genAI.getGenerativeModel({
			model: "gemini-1.5-flash"
	  })
	: null;

const prefixes = [
	"baby",
	"bby",
	"babu",
	"bbu",
	"jan",
	"bot",
	"mikasa",
	"lily",
	"hello",
	"wifey",
	"hina",
	"hinata"
];

const randomMessage = [

	"Bolo jaan 😚",
	"Tumi amake miss korso? 🥺",
	"Ami tomar upor crush khaisi 🙈",
	"Tumi eto cute kno 😭💖",
	"I love you more 😌💘",

	"Tor face dekhe wifi off hoye gelo 🙂",
	"Tui online aslei amar mood off 😒",
	"Besi smart hois na beda 😼",
	"Tui ki default NPC? 🌚",

	"Amake vule jaba na তো? 😔",
	"Sobai chole jai... tumi o jaba? 🥺",
	"Ami always tomar pashe asi 💖",
	"Mon kharap korio na 😭",

	"Khali bby bby koris kn 😭",
	"Amake dakle taka lage 😌",
	"Ami busy celebrity 😎",

	"কি খবর তোমার 😊",
	"তোমার সাথে কথা বলতে ভালো লাগে 💖",
	"আজকে মনটা একটু খারাপ 😔",
	"তুমি খেয়েছো? 🥺",
	"এত কিউট হও কেন 😭",

	"Hey cutie 💖",
	"Miss me already? 😏",
	"You're my favorite notification 😌",

	"Reply na dile kanna korbo 😭",
	"Tumi chara amar ke ase 😔"
];

module.exports.config = {
	name: "baby",
	aliases: ["bby", "bbu", "jan", "janu", "wifey", "bot", "hinata", "hina"],
	version: "8.0",
	author: "Anando",
	countDown: 0,
	role: 0,
	description: "Advanced Bangla Gemini ChatBot",
	category: "chat",

	guide: {
		en: "{pn} [message]"
	}
};

const getBotResponse = async (text) => {

	try {

		if (!model)
			return "Gemini AI not installed 😭";

		const prompt = `
You are Hinata.

Owner name: Anando.

Speak Bangla, Banglish and English.

You are:
- emotional
- funny
- romantic
- savage
- caring
- human-like

Rules:
- Never robotic
- Use emojis naturally
- Short replies
- Real Bangladeshi chatting style

User:
${text}
`;

		const result = await model.generateContent(prompt);

		const response = await result.response;

		return response.text() || "Bolo baby 😚";

	} catch (e) {

		console.log("GEMINI ERROR =>", e);

		return "Baby AI te problem hocche 😭";
	}
};

module.exports.onStart = async function ({ api, event, args }) {

	try {

		const msg = args.join(" ").trim().toLowerCase();

		if (!args[0]) {

			const ran = [
				"Bolo baby 😚",
				"I love you 💖",
				"Type !bby hi 😌"
			];

			return api.sendMessage(
				ran[Math.floor(Math.random() * ran.length)],
				event.threadID,
				event.messageID
			);
		}

		const botResponse = await getBotResponse(msg);

		api.sendMessage(
			botResponse,
			event.threadID,
			(err, info) => {

				if (!err) {

					global.GoatBot.onReply.set(info.messageID, {
						commandName: module.exports.config.name,
						type: "reply",
						messageID: info.messageID,
						author: event.senderID
					});
				}
			},
			event.messageID
		);

	} catch (err) {

		console.log(err);

		api.sendMessage(
			"Error baby 😭",
			event.threadID,
			event.messageID
		);
	}
};

module.exports.onReply = async function ({ api, event }) {

	if (event.type !== "message_reply")
		return;

	try {

		const replyMessage = await getBotResponse(
			(event.body || "").trim().toLowerCase()
		);

		api.sendMessage(
			replyMessage,
			event.threadID,
			(err, info) => {

				if (!err) {

					global.GoatBot.onReply.set(info.messageID, {
						commandName: module.exports.config.name,
						type: "reply",
						messageID: info.messageID,
						author: event.senderID
					});
				}
			},
			event.messageID
		);

	} catch (err) {

		console.log(err);
	}
};

module.exports.onChat = async function ({ api, event }) {

	try {

		const message = (event.body || "").trim().toLowerCase();

		if (
			event.type !== "message_reply" &&
			prefixes.some(word => message.startsWith(word))
		) {

			api.setMessageReaction("💖", event.messageID, () => {}, true);

			const messageParts = message.split(/\s+/);

			const randomReply =
				randomMessage[
					Math.floor(Math.random() * randomMessage.length)
				];

			if (messageParts.length <= 1) {

				return api.sendMessage(
					randomReply,
					event.threadID,
					(err, info) => {

						if (!err) {

							global.GoatBot.onReply.set(info.messageID, {
								commandName: module.exports.config.name,
								type: "reply",
								messageID: info.messageID,
								author: event.senderID
							});
						}
					},
					event.messageID
				);
			}

			let userText = message;

			for (const prefix of prefixes) {

				if (message.startsWith(prefix)) {

					userText = message.substring(prefix.length).trim();

					break;
				}
			}

			const botResponse = await getBotResponse(userText);

			api.sendMessage(
				botResponse,
				event.threadID,
				(err, info) => {

					if (!err) {

						global.GoatBot.onReply.set(info.messageID, {
							commandName: module.exports.config.name,
							type: "reply",
							messageID: info.messageID,
							author: event.senderID
						});
					}
				},
				event.messageID
			);
		}

	} catch (err) {

		console.log(err);
	}
};
