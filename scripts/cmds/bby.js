module.exports = {
	config: {
		name: "baby",
		aliases: ["bby"],
		version: "1.0",
		author: "Anando",
		countDown: 0,
		role: 0,
		description: "test",
		category: "chat"
	},

	onStart: async function ({ message, args }) {

		if (!args[0]) {
			return message.reply("Bolo baby 😚");
		}

		const text = args.join(" ").toLowerCase();

		if (
			text === "hi" ||
			text === "hello"
		) {
			return message.reply("Hello jaan 😚");
		}

		return message.reply(
			"You said: " + text
		);
	}
};
