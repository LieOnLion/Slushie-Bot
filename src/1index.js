require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

let getChannelData = async function() {
    return await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${(process.env.channelID)}&key=${(process.env.apiKey)}`).then(res => res.json())
}

eventHandler(client);

// client.on('ready', (c) => {
//     console.log(`${c.user.username} has woken, hes a little tired\n--------------------------------------`)

//     client.user.setActivity({
//        name: "/slushie <- info"
//     })
// })

// client.on('messageCreate', (msg) => {
//     if (msg.author.bot) return;

//     if (msg.content === 'hello' || msg.content === 'hi'
//     || msg.content === 'Hello' || msg.content === 'Hi') {
//         msg.reply(`Hello ${msg.author.globalName} :D`);
//     }
// })

// client.on('interactionCreate', async (intn) => {
//     if (!intn.isChatInputCommand()) return;

//     if (intn.commandName === 'slushie') {
//         let getSubCount = await getChannelData().then(val => val.items[0].statistics.subscriberCount);
//         let getSubGoal = await getChannelData().then(val => {
//             let count = val.items[0].statistics.subscriberCount
//             if (count >= 500){
//                 return 'Goal reached'
//             } else {return 500 - count + ' Subs Remaining'}
//         });
//         let getViewsCount = await getChannelData().then(val => {
//             let count = val.items[0].statistics.viewCount
//             if (count.length = 4){
//                 return parseFloat(count).toLocaleString('en')
//             } else if (count.length >= 5 && count.length <= 6){
//                 return Math.round(count / 100) / 10 + 'K'
//             } else if (count.length >= 7){
//                 return Math.round(count / 100000) / 10 + 'M'
//             } else {return count}
//         });

//         const embed = new EmbedBuilder()
//             .setAuthor({ name: intn.guild.name, iconURL: `https://cdn.discordapp.com/icons/${intn.guild.id}/${intn.guild.icon}.png` })
//             .setTitle('Slushie')
//             .setDescription('Any Products will be release when my [YouTube](https://www.youtube.com/@lieonlion) channel hits 500 subscribers\nLatest Slushie info - as of 14/10/2023:')
//             .addFields({ name: 'Slushie Mod :', value: '- Mod is Complete', inline: true, },
//                 { name: 'Slushie Pack :', value: '- Pack is Complete', inline: true, },
//                 { name: 'Slushie Stickers/Emojis :', value: '- General Style Complete\n- Physical Drawings in Progress', inline: true, })
//             .setFooter({ text: `${getSubCount} / 500 Slushies - ${getSubGoal} - ${getViewsCount} total channel views`, iconURL: `https://www.youtube.com/s/desktop/abb208b2/img/favicon_144x144.png` })
//             .setColor(0x4e00a1);
//         intn.reply({ embeds: [embed] })
//     }
// })

client.login(process.env.TOKEN);