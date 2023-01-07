const { Client, GatewayIntentBits, SlashCommandBuilder, Options } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('big')
		.setDescription('Sets a reminder for respawning of Big Aquamarine Island')

		.addStringOption(option =>
			option.setName('coordinates')
				.setDescription('Enter Coordinates or name we can refer to while reminding your lousy ass brain')
				.setRequired(true))

		.addNumberOption(option =>
			option.setName('hours')
				.setDescription('Enter the Hours Left for despawn (not Minutes only Hours.. If only some minutes are left, input 0')
				.setRequired(true))

		.addNumberOption(option =>
			option.setName('minutes')
				.setDescription('Enter the Minutes Left for despawn (Can be 0 if exactly some hours are left)')
				.setRequired(true))
				
		.addBooleanOption(option =>
			option.setName('reminder')
				.setDescription('Would you like me to remind you about the respawn?')
				.setRequired(true)),
				
	
	async execute(interaction) {
		const h = interaction.options.getNumber('hours');
		const m = interaction.options.getNumber('minutes');
		const currentTime = new Date().getTime();
		const updatedTime = new Date(currentTime + (72 * 60 * 60 * 1000) + (h * 60 * 60 * 1000) + (m * 60 * 1000));
		const displayTime = new Date(updatedTime).toLocaleTimeString();
		const displayDate = new Date(updatedTime).toLocaleDateString();

		

		if(interaction.options.getBoolean('reminder')){
			const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
			const user = interactionUser.id;
			setTimeout(function(){interactionUser.send('The island ' + interaction.options.getString('coordinates') + ' has respawned!');}, (72 * 60 * 60 * 1000) + (h * 60 * 60 * 1000) + (m * 60 * 1000));
		
			await interaction.reply('The island ' + interaction.options.getString('coordinates') + ' will respawn on ' + displayDate + ' at ' + displayTime + '\n I will remind you when the Island Respawns...');
		}
		else{
			await interaction.reply('The island ' + interaction.options.getString('coordinates') + ' will respawn on ' + displayDate + ' at ' + displayTime);
		}
	},
}