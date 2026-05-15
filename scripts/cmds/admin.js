const config = global.config;
const { writeFileSync } = require("fs-extra");

if (!config.adminBot)
	config.adminBot = [];

module.exports = {
	config: {
		name: "admin",
		version: "1.7",
		author: "MahMUD",
		countDown: 5,
		role: 2,

		description: {
			en: "Add, remove, or list bot admins"
		},

		category: "box chat",

		guide: {
			en:
				"{pn} add @tag or uid\n" +
				"{pn} remove @tag or uid\n" +
				"{pn} list"
		}
	},

	langs: {
		en: {
			added: "✅ | Added admin role for %1 users:\n%2",
			alreadyAdmin: "\n⚠️ | %1 users already admin:\n%2",
			missingIdAdd: "⚠️ | Enter UID or tag user",
			removed: "✅ | Removed admin role from %1 users:\n%2",
			notAdmin: "⚠️ | %1 users are not admin:\n%2",
			missingIdRemove: "⚠️ | Enter UID or tag user",
			listAdmin: "👑 | Admin List:\n\n%1"
		}
	},

	onStart: async function ({ api, event, args, usersData, getLang, message }) {

		const { threadID, messageID } = event;

		const action = args[0]?.toLowerCase();

		switch (action) {

			case "add":
			case "-a": {

				let uids = [];

				if (event.mentions && Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);

				else if (args[1])
					uids = args.slice(1).filter(uid => !isNaN(uid));

				else
					return api.sendMessage(
						getLang("missingIdAdd"),
						threadID,
						null,
						messageID
					);

				const added = [];
				const already = [];

				for (const uid of uids) {

					if (config.adminBot.includes(uid))
						already.push(uid);

					else {
						config.adminBot.push(uid);
						added.push(uid);
					}
				}

				writeFileSync(
					global.client.dirConfig,
					JSON.stringify(config, null, 2)
				);

				const names = await Promise.all(
					uids.map(async uid => ({
						uid,
						name: await usersData.getName(uid)
					}))
				);

				let msg = "";

				if (added.length > 0) {
					msg += getLang(
						"added",
						added.length,
						names
							.filter(x => added.includes(x.uid))
							.map(x => `• ${x.name} (${x.uid})`)
							.join("\n")
					);
				}

				if (already.length > 0) {
					msg += getLang(
						"alreadyAdmin",
						already.length,
						names
							.filter(x => already.includes(x.uid))
							.map(x => `• ${x.name} (${x.uid})`)
							.join("\n")
					);
				}

				return api.sendMessage(
					msg || "Done",
					threadID,
					null,
					messageID
				);
			}

			case "remove":
			case "-r": {

				let uids = [];

				if (event.mentions && Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);

				else if (args[1])
					uids = args.slice(1).filter(uid => !isNaN(uid));

				else
					return api.sendMessage(
						getLang("missingIdRemove"),
						threadID,
						null,
						messageID
					);

				const removed = [];
				const notAdmin = [];

				for (const uid of uids) {

					if (config.adminBot.includes(uid)) {

						config.adminBot.splice(
							config.adminBot.indexOf(uid),
							1
						);

						removed.push(uid);
					}

					else
						notAdmin.push(uid);
				}

				writeFileSync(
					global.client.dirConfig,
					JSON.stringify(config, null, 2)
				);

				const names = await Promise.all(
					uids.map(async uid => ({
						uid,
						name: await usersData.getName(uid)
					}))
				);

				let msg = "";

				if (removed.length > 0) {
					msg += getLang(
						"removed",
						removed.length,
						names
							.filter(x => removed.includes(x.uid))
							.map(x => `• ${x.name} (${x.uid})`)
							.join("\n")
					);
				}

				if (notAdmin.length > 0) {
					msg += getLang(
						"notAdmin",
						notAdmin.length,
						names
							.filter(x => notAdmin.includes(x.uid))
							.map(x => `• ${x.name} (${x.uid})`)
							.join("\n")
					);
				}

				return api.sendMessage(
					msg || "Done",
					threadID,
					null,
					messageID
				);
			}

			case "list":
			case "-l": {

				if (!config.adminBot.length)
					return api.sendMessage(
						"No admins added",
						threadID,
						null,
						messageID
					);

				const names = await Promise.all(
					config.adminBot.map(async uid => ({
						uid,
						name: await usersData.getName(uid)
					}))
				);

				const msg = getLang(
					"listAdmin",
					names
						.map(x => `• ${x.name}\n└ UID: ${x.uid}`)
						.join("\n\n")
				);

				return api.sendMessage(
					msg,
					threadID,
					null,
					messageID
				);
			}

			default:
				return message.SyntaxError();
		}
	}
};
