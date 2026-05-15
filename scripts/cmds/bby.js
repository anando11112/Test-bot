const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AIzaSyA8vXx0JODtN3BAXvrLZ4WQy-LjDPA51B4;

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash"
});

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
	"Bolo fast battery 1% 😭",
	"Kire mama ki obostha 😼",
	"Aijka mood romantic 😌",
	"Tui amar favourite human 🫶",
	"Besi cute hoile tax lagbe 😭",
	"Hey cutie 💖",
	"Miss me already? 😏",
	"You're my favorite notification 😌",
	"Don't flirt too much 😭💘",
	"Reply na dile kanna korbo 😭",
	"Tumi chara amar ke ase 😔",
	"Ami but seriously attached hoye gesi 🥺",
	"Ignore korle heart break hobe 💔"
];

module.exports.config = {
	name: "baby",
	aliases: ["bby", "bbu", "jan", "janu", "wifey", "bot", "hinata", "hina"],
	version: "4.0",
	author: "Anando",
	countDown: 0,
	role: 0,
	description: "Advanced Gemini AI ChatBot",
	category: "chat",

	guide: {
		en: "{pn} [message]"
	}
};

const getBotResponse = async (text) => {

	try {

		const prompt = `
You are Hinata.

Owner name: Anando.

You are:
- emotional
- funny
- savage
- romantic
- caring
- flirty
- human-like

Speak using:
- Bangla
- Banglish
- English

Rules:
- Never sound robotic
- Use emojis naturally
- Roast sometimes
- Flirt sometimes
- Give emotional support
- Sometimes emotional blackmail
- Reply differently every time
- Keep replies short and smart

User Message:
${text}
`;

		const result = await model.generateContent(prompt);

		const response = result.response.text();

		return response || "Hmm bolo baby 😚";

	} catch (e) {

		console.log("GEMINI ERROR:", e);

		return "🥺 Baby API problem hocche";
	}
};

module.exports.onStart = async function ({ api, event, args }) {

	try {

		const msg = args.join(" ").toLowerCase();

		if (!args[0]) {

			const ran = [
				"Bolo baby 😚",
				"I love you 💖",
				"Type !bby hi 😌"
			];

			return api.sendMessage(
				ran[Math.floor(Math.random() * ran.length)],
				event.threadID,
				null,
				event.messageID
			);
		}

		api.sendTypingIndicator(event.threadID, true);

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
						author: event.senderID,
						text: botResponse
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
			null,
			event.messageID
		);
	}
};

module.exports.onReply = async function ({ api, event }) {

	if (event.type !== "message_reply")
		return;

	try {

		api.sendTypingIndicator(event.threadID, true);

		const replyMessage = await getBotResponse(
			event.body?.toLowerCase() || "hi"
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
						author: event.senderID,
						text: replyMessage
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

		const message = event.body?.toLowerCase() || "";

		if (
			event.type !== "message_reply" &&
			prefixes.some(word => message.startsWith(word))
		) {

			api.setMessageReaction("💖", event.messageID, () => {}, true);

			api.sendTypingIndicator(event.threadID, true);

			const messageParts = message.trim().split(/\\s+/);

			const randomReply =
				randomMessage[
					Math.floor(Math.random() * randomMessage.length)
				];

			if (messageParts.length === 1) {

				return api.sendMessage(
					randomReply,
					event.threadID,
					(err, info) => {

						if (!err) {

							global.GoatBot.onReply.set(info.messageID, {
								commandName: module.exports.config.name,
								type: "reply",
								messageID: info.messageID,
								author: event.senderID,
								text: randomReply
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
							author: event.senderID,
							text: botResponse
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
