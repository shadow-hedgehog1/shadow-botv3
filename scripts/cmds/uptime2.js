module.exports = {
	config: {
		name: "up2",
		version: "1.1",
		author: "lonely",
		role: 0,
		category: "system",
		guide: {
			en: "uptime"
		}
	},

	onStart: async function ({ message, api }) {
		// Loading message
		const loading = await message.reply("⏳ Checking uptime...");

		// Calculate uptime
		const up = process.uptime();
		const days = Math.floor(up / 86400);
		const hours = Math.floor((up / 3600) % 24);
		const minutes = Math.floor((up / 60) % 60);
		const seconds = Math.floor(up % 60);

		const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

		const text =
			"🤖 LONELY BOT\n" +
			"━━━━━━━━━━━━━━\n" +
			`⏱ Uptime: ${uptime}`;

		// Edit message
		await api.editMessage(text, loading.messageID);
	}
};