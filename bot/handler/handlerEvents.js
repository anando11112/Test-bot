module.exports = async function ({ api, event, threadsData, usersData, commandName }) {
	try {
		if (!event.body) return;

		const commands = global.GoatBot.commands;

		for (const [, command] of commands) {

			// ON CHAT
			if (command.onChat) {
				try {
					await command.onChat({
						api,
						event,
						threadsData,
						usersData,
						commandName
					});
				}
				catch (e) {
					console.log(`onChat Error (${command.config.name}):`, e.message);
				}
			}

			// ON REPLY
			if (
				event.messageReply &&
				global.GoatBot.onReply &&
				global.GoatBot.onReply.has(event.messageReply.messageID)
			) {
				try {
					await command.onReply({
						api,
						event,
						threadsData,
						usersData,
						commandName
					});
				}
				catch (e) {
					console.log(`onReply Error (${command.config.name}):`, e.message);
				}
			}
		}

	} catch (err) {
		console.log("handlerEvents Error:", err);
	}
};
