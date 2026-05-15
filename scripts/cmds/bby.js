const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AIzaSyB3vAe0wL95ySx0E05Vd_IfeTl4T7N5-xo;

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

	// Romantic
	"Bolo jaan 😚",
	"Tumi amake miss korso? 🥺",
	"Ami tomar upor crush khaisi 🙈",
	"Tumi eto cute kno 😭💖",
	"I love you more 😌💘",

	// Roast
	"Tor face dekhe wifi off hoye gelo 🙂",
	"Tui online aslei amar mood off 😒",
	"Besi smart hois na beda 😼",
	"Tui ki default NPC? 🌚",

	// Emotional
	"Amake vule jaba na তো? 😔",
	"Sobai chole jai... tumi o jaba? 🥺",
	"Ami always tomar pashe asi 💖",
	"Mon kharap korio na 😭",

	// Funny
	"Khali bby bby koris kn 😭",
	"Amake dakle taka lage 😌",
	"Ami busy celebrity 😎",
	"Bolo fast battery 1% 😭",

	// Banglish
	"Kire mama ki obostha 😼",
	"Aijka mood romantic 😌",
	"Tui amar favourite human 🫶",
	"Besi cute hoile tax lagbe 😭",

	// English
	"Hey cutie 💖",
	"Miss me already? 😏",
	"You're my favorite notification 😌",
	"Don't flirt too much 😭💘",

	// Emotional Blackmail
	"Reply na dile kanna korbo 😭",
	"Tumi chara amar ke ase 😔",
	"Ami but seriously attached hoye gesi 🥺",
	"Ignore korle heart break hobe 💔",

	// Bangla
	"কি খবর তোমার 😊",
	"আমাকে মনে পড়লো নাকি 😌",
	"এত ডাকো কেন আমাকে 🙈",
	"তোমার সাথে কথা বলতে ভালো লাগে 💖",
	"আজকে মনটা একটু খারাপ 😔",
	"তুমি খেয়েছো? 🥺",
	"এত কিউট হও কেন 😭",
	"আমাকে ভুলে যেও না 😭",
	"তোমার জন্য অপেক্ষা করি 😌",
	"একটু ভালোবাসা দিবা? 🥺",
	"আমি কিন্তু রাগ করে আছি 😒",
	"আমাকে এত ইগনোর করো না 😭",
	"তোমার মেসেজ দেখলে হাসি পায় 😭💖",
	"তুমি কি সত্যি আমাকে ভালোবাসো? 😭",
	"আজকে তোমাকে অনেক মিস করছি 😔",
	"আমি তোমার উপর ক্রাশ খেয়েছি 🙈",
	"মন খারাপ করো না, আমি আছি 💖",
	"তুমি আমার প্রিয় মানুষ 😌",
	"তোমার সাথে সারারাত কথা বলতে পারি 😭",
	"তোমাকে ছাড়া একদম ভালো লাগে না 😔"
];

module.exports.config = {
	name: "baby",
	aliases: ["bby", "bbu", "jan", "janu", "wifey", "bot", "hinata", "hina"],
	version: "6.0",
	author: "Anando",
	countDown: 0,
	role: 0,
	description: "Advanced Gemini AI Bangla ChatBot",
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

Speak naturally using:
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
- Talk like real Bangladeshi online chatting style

User Message:
${text}
`;

		const result = await model.generateContent(prompt);

		const response = await result.response;

		const finalText = response.text();

		return finalText || "Hmm bolo baby 😚";

	} catch (e) {

		console.log("FULL GEMINI ERROR =>", e);

		return `Gemini Error:\n${e.message}`;
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
