const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

let getChannelData = async function() {
    return await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${(process.env.channelID)}&key=${(process.env.apiKey)}`).then(res => res.json())
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slushie')
    .setDescription('Get the latest Slushie info'),
    async execute (interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'slushie') {
            let getSubCount = await getChannelData().then(data => data.items[0].statistics.subscriberCount);
            let getSubGoal = await getChannelData().then(data => {
                let count = data.items[0].statistics.subscriberCount
                if (count >= 500){
                    return 'Goal reached'
                } else {return 500 - count + ' Subs Remaining'}
            });
            let getViewsCount = await getChannelData().then(data => {
                let count = data.items[0].statistics.viewCount
                if (count.length = 4){
                    return parseFloat(count).toLocaleString('en')
                } else if (count.length >= 5 && count.length <= 6){
                    return Math.round(count / 100) / 10 + 'K'
                } else if (count.length >= 7){
                    return Math.round(count / 100000) / 10 + 'M'
                } else {return count}
            });

            const embed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: `https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png` })
                .setTitle('Slushie')
                .setDescription('Any Products will be release when my [YouTube](https://www.youtube.com/@lieonlion) channel hits 500 subscribers\nLatest Slushie info - as of 14/10/2023:')
                .addFields({ name: 'Slushie Mod :', value: '- Mod is Complete', inline: true, },
                    { name: 'Slushie Pack :', value: '- Pack is Complete', inline: true, },
                    { name: 'Slushie Stickers/Emojis :', value: '- General Style Complete\n- Physical Drawings in Progress', inline: true, })
                .setFooter({ text: `${getSubCount} / 500 Slushies - ${getSubGoal} - ${getViewsCount} total channel views`, iconURL: `https://www.youtube.com/s/desktop/abb208b2/img/favicon_144x144.png` })
                .setColor(0x4e00a1);
                interaction.reply({ embeds: [embed] })
        }
    }
}