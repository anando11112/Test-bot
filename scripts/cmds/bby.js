module.exports.config = {
	name: "baby",
	aliases: ["bby"],
	version: "1.0",
	author: "Anando",
	countDown: 0,
	role: 0,
	description: "Simple Chat",
	category: "chat",
};

const replies = [
	"Bolo baby 😚",
	"Tumi amake dakso? 🥺",
	"I love you 💖",
	"Ki korso 😭",
	"Tumi cute 😌"
];

module.exports.onChat = async function ({ event, message }) {

	try {

		const body = (event.body || "").toLowerCase().trim();

		if (
			body === "bby" ||
			body === "baby"
		) {

			const msg =
				replies[Math.floor(Math.random() * replies.length)];

			return message.reply(msg);
		}

	} catch (e) {
		console.log(e);
	}
};
