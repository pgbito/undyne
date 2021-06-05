const morse = require("./utils/morse")
const fs = require('fs')
const discord = require('discord.js')
const add = require("./utils/addtimestarted")
const CHANNEL = 1;
const queue = new Map()
const USER = CHANNEL + 1;
const ROLE = USER + 1;
const fetch = require('node-fetch')
const { Util } = require('discord.js')
const sleep = ms => new Promise(res => setTimeout(res, ms));
let block = `${'```'}`
function codeblock(text) {
    return block + text + block
}
let smonths = ['null jjj', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const { stripIndent, stripIndents } = require('common-tags')
var default_color = 0xedcdc6
const timesStarted = require('./utils/.private/timestarted.json')
const md5 = require("md5")
const yts = require("yt-search");
const scdl = require("soundcloud-downloader").default;
var { getData, getPreview } = require("spotify-url-info");
const nhentai = require('nhentai');
const api = new nhentai.API();
const response = require("../Otis/misc/response")
const ytdl = require("ytdl-core");
const { jsonfy } = require("booru/dist/Utils");
const client = new discord.Client({
    disableEveryone: true, ws: { properties: { $browser: "Discord Android" } }
});
const disbut = require('discord-buttons')(client);
let config = { prefix: '$' }
client.queue = new Map();


client.on("ready", () => {

    let x = [`pgbito.xyz/undyne || times restarted: ${timesStarted.count[timesStarted.count.length - 1]}`, "UNDER DEVELOPMENT || EN DESAROLLO"]
    client.user.setActivity(x[0]).then(p => console.log(client.user.username + ' iniciado completamente, status: ' + x))
})
client.on("guildMemberAdd", (member) => {
    let path = `./utils/.private/welcomechannels/${member.guild.id}.txt`
    try {
        if (fs.existsSync(path)) {
            fs.readFile(path, 'utf-8', function (err, data) {
                let channelID = data;
                if (err) throw err
                embed.setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
                let text = stripIndent`
                .

                💮welcome! ${member.user.tag} (つ≧▽≦)つ⊂(・ヮ・⊂)
                .`
                embed.setDescription(text)
                embed.setColor(default_color)
                let offTopic = member.guild.channels.cache.get(channelID);
                offTopic.send(embed)
                member.send(embed)
            })
        }
    } catch (err) {
        console.error(err)
    }



})
client.on("guildMemberRemove", (member) => {
    let path = `./utils/.private/welcomechannels/${member.guild.id}.txt`
    try {
        if (fs.existsSync(path)) {
            fs.readFile(path, 'utf-8', function (err, data) {
                let channelID = data;
                if (err) throw err
                embed.setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
                embed.setDescription(stripIndent`
            .
            
            💮bye! ${member.user.tag} (╥﹏╥)
            .`)

                embed.setColor(default_color)
                let offTopic = member.guild.channels.cache.get(channelID);
                offTopic.send(embed)
                member.send(embed)
            })
        }
    } catch (err) {
        console.error(err)
    }
})

//symbols  =>  <
client.on("message", async (message) => {
 
    prefix = config.prefix;

    if (message.content.toLowerCase().includes(client.user.username)) {
        let emojis = ["💔", "😩", "🛐"]
        emojis.forEach(emoji => message.react(emoji))
    }
    if(message.guild === null) return
    if (!message.content.toLowerCase().startsWith(prefix)) return
    if (message.author.id == client.user.id) return
    if (message.channel == message.author) return

    var multiple_roles_channel = message.guild.channels.cache.find(channel => channel.name == "create-roles");
    if (multiple_roles_channel) {
        if (message.channel == multiple_roles_channel) {
            const arg = message.content
            if (arg.startsWith(prefix)) return
            if (arg.length >= 100) return ['❕', '❗'].forEach(x => message.react(x))
            if (1 > arg.length) return ['❕', '❗'].forEach(x => message.react(x))
            if (arg == 'done') {
                return message.channel.delete('Porque sí')
            }
            message.guild.roles.create({ data: { name: arg } })

            message.react('💔')

        }
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let sigleWordArg = args[0]
    let all_entire_argument = args.slice(1).join(' ')
    if (message.content.toLowerCase().startsWith(`${prefix}test`)) {
        const embed = new discord.MessageEmbed()
        embed.setTitle('u.u')
        embed.setImage('https://cdn.discordapp.com/attachments/837025289681895426/842228903703216198/tenor.gif')
        embed.setFooter('if you need help dm Pgbito_#4440')
        embed.setDescription(`hi, i'm ${client.user.username}, a brand new bot developed by Pgbito, but, i'm still in development...`)
        embed.addField('Important..', 'if u want to suggest something to add to the bot, use `$suggest`')
        message.channel.send(embed).then(m => m.react('💔'))

    }

    if (message.content.toLowerCase().startsWith(`${prefix}create-multiple-roles`)) {

        if (!multiple_roles_channel) {
            message.guild.channels.create('create-roles')
            message.react('💔')
        }


        else message.channel.send('go to ' + mentionWithID(multiple_roles_channel, CHANNEL))
    }
    if (message.content.toLowerCase().startsWith(`${prefix}suggest`)) {
        const admin = client.users.cache.get('835526703844425739')
        if (!all_entire_argument) return message.channel.send('you need to provide something to suggest :(')
        if (message.attachments.size > 0) {
            message.attachments.forEach(Attachment => {
                admin.send(`**${message.author.tag} (${message.author.id})** \n ${'```'}Sugerencia enviada: ${all_entire_argument}${'```'} \n\n **Archivos adjuntos:** `)
                admin.send(Attachment).then(admin.send(`${'```'}${Attachment.size}${'```'}`))

                message.react('✅')
            })
        } else {
            admin.send(`**${message.author.tag} (${message.author.id})** \n ${'```'}Sugerencia enviada: ${all_entire_argument}${'```'}`)
            message.react('✅')
        }

    }
    if (message.content.toLowerCase().startsWith(`${prefix}setWelcomeChannel`)) {
        let path = `./utils/.private/welcomechannels/${message.guild.id}.txt`

        try {
            if (fs.existsSync(path)) {
                if (message.content.toLowerCase().startsWith(prefix + 'setWelcomeChannel set')) return
                fs.readFile(path, 'utf-8', function (err, data) {
                    if (err) throw err
                    message.channel.send('welcome channel is already set, <#' + data + '>')
                })
            } else {
                let channel_to_set = message.guild.channels.cache.find(role => role.name === sigleWordArg) || message.mentions.channels.first().id
                if (!channel_to_set) return message.channel.send('you have to tag one channel.')
                fs.appendFile(path, channel_to_set, function (err) {
                    if (err) throw err;
                });
                fs.writeFile(path, channel_to_set, 'utf-8', function (err) {
                    if (err) throw err
                })
                message.react('✅')

            }
        } catch (err) { console.error(err) }
    }
    if (message.content.toLowerCase().startsWith(`${prefix}hash`)) {
        const embed = new discord.MessageEmbed()
        if (!all_entire_argument) return message.channel.send('you have to provide a string to encode jjjj')
        embed.setDescription(`encrypting... ${all_entire_argument}`)
        embed.setColor(default_color)
        let msg = await message.channel.send(embed)
        embed.setColor(default_color)
        embed.setDescription(`**result**: \n ${'```'}${md5(all_entire_argument)}${'```'}`)
        embed.setFooter('done in ' + client.ws.ping + 'ms')
        msg.edit(embed)

    }
    if (message.content.toLowerCase().startsWith(`${prefix}morse`)) {
        const embed = new discord.MessageEmbed()
        if (!all_entire_argument) return message.channel.send('you have to provide a string, for converting it into morse')
        embed.addField('Morse-coded string:', `${'```'}${morse(`${all_entire_argument}`)}${'```'}`)
        message.channelñ.send(embed)
    }
    if (message.content.toLowerCase().startsWith(prefix + 'ban')) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(response(1) + ' Banear miembros.')
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                if (member == message.member) return message.channel.send(response(6))

                member.ban({ reason: args.slice(2).join(" ") }).then(() => {
                    // We let the message author know we were able to ban the person
                    let text = (member.user.tag + ' ha sido baneado.')
                    message.channel.send({ embed: { color: 'RED', description: '```' + text + '```' } });
                    member.user.send('Has sido baneado de ' + member.guild.name + ' razón: ' + reason)
                })

            } else {
                // The mentioned user isn't in this guild
                message.channel.send(response(4));
            }
        } else {
            // Otherwise, if no user was mentioned
            message.channel.send(response(3));
        }
    }
    if (message.content.toLowerCase().startsWith(prefix + 'kick')) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(response(1) + ' Kickear miembros.')
        const user = message.mentions.users.first();
        if (user) {

            const member = message.guild.members.resolve(user);
            if (member) {
                if (member == message.member) return message.channel.send(response(6))
                member.kick({ reason: args.slice(2).join(" ") }).then(() => {
                    // We let the message author know we were able to ban the person
                    let text = (member.user.tag + ' ha sido kickeado.')
                    message.channel.send({ embed: { color: 'RED', description: '```' + text + '```' } });
                    member.user.send('Has sido kickeado de ' + member.guild.name + ' razón: ' + reason)
                })
                    .catch(err => {
                        message.channel.send(response(5));
                    });
            } else {
                // The mentioned user isn't in this guild
                message.channel.send(response(4));
            }
        } else {
            // Otherwise, if no user was mentioned
            message.channel.send(response(3));
        }
    }
    if (message.content.toLowerCase().startsWith(prefix + 'play')) {
        const embed = new discord.MessageEmbed()
        Play(client, message, args)
    }
    if (message.content.toLowerCase().startsWith(prefix + 'skip')) {
        const embed = new discord.MessageEmbed()
        Skip(client, message, args)
    }
    if (message.content.toLowerCase().startsWith(prefix + 'rule34') || message.content.toLowerCase().startsWith(prefix + 'r34')) {
        const Booru = require('booru')
        if (nsfw(message) === true) {
            if (!args.slice(1).join(" ")) return message.channel.send('you need to provide something to search in that site.')
            Booru.search("rule34.xxx", [args.slice(1).join(" "),], { limit: 5, random: true })
                .then(posts => {
                    posts.forEach(post => {
                        const embed = new discord.MessageEmbed()
                        embed.setImage(post.fileUrl, post.postView)
                        message.channel.send(embed)
                    })
                })
        } else {
            message.channel.send(nsfw(1))
        }
    }
    if (message.content.toLowerCase().startsWith(prefix + 'nhentai')) {
        const embed = new discord.MessageEmbed()
        if (nsfw(message) === true) {
            if (!args.slice(1).join(" ")) return message.channel.send('you need to provide the *code* in that site.')
            if (isNaN(args.slice(1).join(" "))) return message.channel.send('that`s not a number')

            if (args.slice(1).join(" ") < 1) return message.reply('not a valid *code*');

            const doujin = await api.fetchDoujin(args.slice(1).join(" "))
            if (doujin) {

                // Keijun Yahagi wa Koi o Shita. Jou | Light Cruiser Yahagi Fell In Love - First
                let title = doujin.titles.pretty;


                // https://i.nhentai.net/galleries/1767063/1.jpg

                // https://t.nhentai.net/galleries/1767063/cover.jpg
                let cover = doujin.cover.url;

                // english, translated, kantai collection, teitoku, yahagi, rosapersica, [etc...]
                let pagesl = doujin.length

                let page = 1;

                embed.setTitle(title)
                embed.setImage(cover)
                embed.setDescription(`https://nhentai.net/g/${args.slice(1).join(" ")}`)
                embed.setFooter(`cover`)
                let msg = await message.channel.send({ embed: embed })
                await msg.react('✅')
                const filtroSiguiente = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                const siguiente = msg.createReactionCollector(filtroSiguiente, { time: 900000, dispose: true });
                siguiente.on("collect", r => {
                    r.users.remove(message.author.id)
                    if (page === pagesl) return
                    page--;
                    embed.setTitle(title)
                    embed.setImage(doujin.pages[2].url)
                    embed.setDescription(`https://nhentai.net/g/${args.slice(1).join(" ")}`)
                    embed.setFooter(`Pages: ${page} / ${pagesl}`)
                    msg.edit(embed)

                })

            } else return message.channel.send('no encontre ni mierda')
        } else return message.channel.send(nsfw(1))

    }
    if (message.content.toLowerCase().startsWith(prefix + 'userinfo') || message.content.toLowerCase().startsWith(prefix + 'user') || message.content.toLowerCase().startsWith(prefix + 'about')) {
        const embed = new discord.MessageEmbed()
        if (message.mentions.members.first()) {
            let member = message.mentions.members.first()

            let memberr = member
            let color = memberr.displayHexColor
            let avatar = memberr.user.displayAvatarURL({ size: 4096 })
            let nickname = memberr.nickname
            let username = memberr.user.username
            let discriminator = memberr.user.tag
            let deleted = memberr.deleted
            let roles = memberr.roles.cache
            let id = memberr.id
            let mention = mentionWithID(id, USER)

            let date_join_guild = memberr.joinedAt
            let discord_join = memberr.user.createdAt
            let isNitroUser = memberr.premiumSince
            //permisos
            member.user.createdAt
            let isbot = memberr.user.bot
            if (roles) {


                embed.addField('Role [' + 's' + ']', `${roles.array().join(' | ')}`, true)

            }
            if (color) {
                embed.setColor(color)
            }
            if (username || discriminator || avatar) {
                embed.setThumbnail(avatar)
                embed.setAuthor(discriminator, avatar)
                embed.setDescription(mention)

            }
            if (nickname) {
                embed.addField('Nickname.', `${block}'${nickname}'${block}`)
            }
            if (deleted) {
                embed.addField('Deleted user:', `${block}${'yes'}${block}`)
            }
            /* if(roles){
                
                embed.addField('Roles: (' +roles.size+ ')' , roles.join(' '))
            } */
            if (isbot) {
                embed.addField('Bot: ', `${block}${'true'}${block}`)
            }
            else {
                embed.addField('Bot: ', `${block}${'false'}${block}`)
            }
            if (date_join_guild) {
                let year = (date_join_guild.getYear() + 1900)
                let day = (date_join_guild.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = date_join_guild.getHours();
                    let y = date_join_guild.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = date_join_guild.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Joined guild at: ', `${block}${fulldate}${block}`)
            }
            if (memberr.id == memberr.guild.ownerID) {
                embed.addField('Is guild owner:', `${block}${true}${block}`)
            }
            if (id) {
                embed.addField('User ID:', `${block}${id}${block}`)
            }
            if (isNitroUser) {
                let year = (isNitroUser.getYear() + 1900)
                let day = (isNitroUser.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = isNitroUser.getHours();
                    let y = isNitroUser.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = isNitroUser.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Boosting since', `${block}${fulldate}${block}`)
            }

            if (discord_join) {
                let year = (discord_join.getYear() + 1900)
                let day = (discord_join.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = discord_join.getHours();
                    let y = discord_join.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = discord_join.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Joined discord at: ', `${block}${fulldate}${block}`)
            }

            return message.channel.send(embed)

        } else {
            let member = message.member
            let memberr = member
            let color = memberr.displayHexColor
            let avatar = memberr.user.displayAvatarURL({ size: 4096 })
            let nickname = memberr.nickname
            let username = memberr.user.username
            let discriminator = memberr.user.tag
            let deleted = memberr.deleted
            let roles = memberr.roles.cache
            let id = memberr.id
            let mention = mentionWithID(id, USER)

            let date_join_guild = memberr.joinedAt
            let discord_join = memberr.user.createdAt
            let isNitroUser = memberr.premiumSince
            //permisos
            member.user.createdAt
            let isbot = memberr.user.bot
            if (roles) {


                embed.addField('Role [' + 's' + ']', `${roles.array().join(' | ')}`, true)

            }
            if (color) {
                embed.setColor(color)
            }
            if (username || discriminator || avatar) {
                embed.setThumbnail(avatar)
                embed.setAuthor(discriminator, avatar)
                embed.setDescription(mention)

            }
            if (nickname) {
                embed.addField('Nickname.', `${block}'${nickname}'${block}`)
            }
            if (deleted) {
                embed.addField('Deleted user:', `${block}${'yes'}${block}`)
            }
            /* if(roles){
                
                embed.addField('Roles: (' +roles.size+ ')' , roles.join(' '))
            } */
            if (isbot) {
                embed.addField('Bot: ', `${block}${'true'}${block}`)
            }
            else {
                embed.addField('Bot: ', `${block}${'false'}${block}`)
            }
            if (date_join_guild) {
                let year = (date_join_guild.getYear() + 1900)
                let day = (date_join_guild.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = date_join_guild.getHours();
                    let y = date_join_guild.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = date_join_guild.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Joined guild at: ', `${block}${fulldate}${block}`)
            }
            if (memberr.id == memberr.guild.ownerID) {
                embed.addField('Is guild owner:', `${block}${true}${block}`)
            }
            if (id) {
                embed.addField('User ID:', `${block}${id}${block}`)
            }
            if (isNitroUser) {
                let year = (isNitroUser.getYear() + 1900)
                let day = (isNitroUser.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = isNitroUser.getHours();
                    let y = isNitroUser.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = isNitroUser.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Boosting since', `${block}${fulldate}${block}`)
            }

            if (discord_join) {
                let year = (discord_join.getYear() + 1900)
                let day = (discord_join.getDate())
                //symbols  =>  <
                const hour = () => {
                    let x = discord_join.getHours();
                    let y = discord_join.getMinutes();
                    if (x >= 12) return x + ':' + y + ' PM'
                    if (x <= 23 && x <= 12) return x + ':' + y + ' AM'
                    if (x == 0) return x + ':' + y + ' AM'
                }
                const month = () => {

                    let nmonth = discord_join.getMonth()
                    if (nmonth === 1) return smonths[1].toLowerCase()
                    if (nmonth === 2) return smonths[2].toLowerCase()
                    if (nmonth === 3) return smonths[3].toLowerCase()
                    if (nmonth === 4) return smonths[4].toLowerCase()
                    if (nmonth === 5) return smonths[5].toLowerCase()
                    if (nmonth === 6) return smonths[6].toLowerCase()
                    if (nmonth === 7) return smonths[7].toLowerCase()
                    if (nmonth === 8) return smonths[8].toLowerCase()
                    if (nmonth === 9) return smonths[9].toLowerCase()
                    if (nmonth === 10) return smonths[10].toLowerCase()
                    if (nmonth === 11) return smonths[11].toLowerCase()
                    if (nmonth === 12) return smonths[12].toLowerCase()

                }
                let fulldate = [month(), day, year, hour()].join(', ')
                embed.addField('Joined discord at: ', `${block}${fulldate}${block}`)
            }

            return message.channel.send(embed)

        }


    }
    if (message.content.toLowerCase().startsWith(prefix + 'custom-message')) {
        let path = `./utils/.private/custom_messages/${message.author.id}.txt`
        if (fs.existsSync(path)) return message.channel.send('no')

        let cms = all_entire_argument;
        if (!cms) return message.channel.send('you have to tag one channel.')

        fs.writeFile(path, cms, 'utf-8', function (err) {
            if (err) throw err
        })
        message.react('✅')


    }
    if (message.content.toLowerCase().startsWith(prefix + 'undertale')) {
        let char = args[1];
        if (!char) return message.reply("Please select your character".toLowerCase())
        let express = args[2];
        if (!express) return message.reply(`Please type expression`.toLowerCase())
        let text = args.slice(3).join("%20")
        if (!text) return message.reply("Please type message".toLowerCase())
        let link = (`http://www.demirramon.com/gen/undertale_text_box.gif?message=${text}%20character=${char}%20expression=${express}%20font=determination%2520%2520animate=true`)
        const embed = new discord.MessageEmbed()
        embed.setColor(default_color)
        embed.setImage(link)
        message.channel.send(embed)
    }
    if (message.content.toLowerCase().startsWith(prefix + 'invite')) {
        message.react('✅')
        message.author.send(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=4231523959`)
    }

    /*    let path = `./utils/.private/custom_messages/${message.author.id}.txt`
       try {
           if (fs.existsSync(path)) {
               fs.readFile(path, 'utf-8', function (err, data) {
                   let message = data;
                   
              
               })
           }
       }
        */
})

//login event lol
fs.readFile(morse('-..-. - --- -.- . -. ... -..-. -.. .. ... -.-. --- .-. -.. -..-. -.-. --- -. ..-. .. --. .-.-.- '), 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    add()
    client.login(JSON.parse(data).token).then(console.log('Login done.'))
})



//other basic functions

function OO(message) {
    if (message.author.id !== '835526703844425739') return message.channel.send('this command is owner only. -w-')

}
/* function development(message) {
    if (message.author.id == client.user.id) return
    if (message.author.id !== '835526703844425739') return message.channel.send('this bot is under development, -w-')

} */
function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}
function is_multimedia_url(str) {
    if (is_url(str)) {
        let regexp = /\.(jpeg|jpg|gif|png|mp4|webm)$/
        if (str.test(regexp)) {
            return true;
        }
        else {
            return false;
        }
    } else return false;
}
function mentionWithID(ID, type) {
    if (!ID || !type) return undefined
    if (type == CHANNEL) {
        return `<#${ID}>`
    }
    if (type == USER) {
        return `<@!${ID}>`
    }
    if (type == ROLE) {
        return `<@&${ID}>`
    }

}
function ERR0R(error_code, args1) {

    const err1 = 1 //NO user perms
    const err2 = 2 //bot doesnt have enough perms
    const err3 = 3 //NO user provided

    if (error_code) {
        if (error_code == err1) return 'No tienes permisos suficientes para ejecutar este comando. ' + '`' + args1 + '`'
        if (error_code == err2) return 'No tengo suficientes permisos para ejecutar este comando. ' + '`' + args1 + '`'
        if (error_code == err3) return 'Menciona un usuario. :/'
        if (error_code == 4) return 'Este usuario no existe, o no esta en este servidor. U.U'
        if (error_code == 5) return 'Este usuario no se puede banear, tiene permisos de administrador, o tiene un rol mas alto que tú.'
        if (error_code == 6) return 'No puedes hacer eso contra tu mismo! >. <'
        if (error_code == 7) return 'No especificado.'
        if (error_code == 8) return 'Algo salió mal :('
        if (error_code == 9) return 'No se pudo realizar el comando.'
        if (error_code == 10) return '❌ | Necesitas especificar el nombre del video, o el respectivo URL '
        if (error_code == 11) return "Necesitas estar en un canal de voz -.-!"
        if (error_code == 12) return 'No se pudo reproducir este video.'
        if (error_code == 13) return 'El bot no está reproduciendo ningún video. >:('
        if (error_code == NaN) return 'Invalid error!'

    }
    else {
        return 'Unknown error'
    }


}
function nsfw(message) {
    if (message === 1) return 'you cant run nsfw commands in a non-nsfw channel'
    if (message.channel.nsfw) return true
    else return false
}
async function Play(client, message, args) {
    const { MessageEmbed } = require('discord.js')
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send(response(11)).then(m => m.delete(4000));
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send(response(2, 'Conectar al canal de voz')).then(m => m.delete(4000))
    if (!permissions.has("SPEAK")) return message.channel.send(response(2, 'Hablar en el canal de voz ')).then(m => m.delete(4000))
    var searchString = args.slice(1).join(" ")
    if (!searchString) return message.channel.send(response(10)).then(m => m.delete(4000))
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    var serverQueue = message.client.queue.get(message.guild.id);

    let songInfo = null;
    let song = null;
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
        try {
            songInfo = await ytdl.getInfo(url);
            if (!songInfo) return message.channel.send(response(12)).then(m => m.delete(4000))
            song = {
                id: songInfo.videoDetails.videoId,
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
        } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
    } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
        try {
            songInfo = await scdl.getInfo(url);
            if (!songInfo) return message.channel.send(response(12)).then(m => m.delete(4000))
            song = {
                id: songInfo.permalink,
                title: songInfo.title,
                url: songInfo.permalink_url,
            };
        } catch (error) {
            console.error(error);
            return sendError(error.message, message.channel).catch(console.error);
        }
    } else if (url.match(/^https?:\/\/(open\.spotify\.com)\/(.*)$/gi)) {
        try {
            const data = await getPreview(searchString);
            var searched = await yts.search(data.title + ' - ' + data.artist + ' Official Audio');
            if (searched.videos.length === 0) return message.channel.send(response(12)).then(m => m.delete(4000))
            const meta = data.title + ' - ' + data.artist;
            songInfo = searched.videos[0];
            song = {
                id: songInfo.videoId,
                title: Util.escapeMarkdown(meta),
                url: songInfo.url,
            };
        } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
    }
    else {
        try {
            var searched = await yts.search(searchString);
            if (searched.videos.length === 0) return message.channel.send(response(12)).then(m => m.delete(4000))

            songInfo = searched.videos[0];
            song = {
                id: songInfo.videoId,
                title: Util.escapeMarkdown(songInfo.title),
                url: songInfo.url,
            };
        } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
    }


    if (serverQueue) {

        serverQueue.songs.push(song);
        let thing = new MessageEmbed()
        thing.setDescription(codeblock(`Reproduciendo: ${song.title}. 🥶`))
        thing.setFooter('$play')
        thing.setColor(default_color)
        return message.channel.send(thing)
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 70,
        playing: true,
        loop: false,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
            message.delete()
            message.guild.me.voice.channel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
            message.client.queue.delete(message.guild.id);
            return;
        }
        let stream;
        let streamType;

        try {
            if (song.url.includes("soundcloud.com")) {
                try {
                    stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, token(4));
                } catch (error) {
                    stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, token(4));
                    streamType = "unknown";
                }
            } else if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url, { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" })
                stream.on("error", function (er) {
                    if (er) {
                        if (queue) {
                            queue.songs.shift();
                            play(queue.songs[0]);
                            return sendError(`Error ${er}`, message.channel);
                        }
                    }
                });
            }
            else if (song.url.includes("open.spotify.com")) {
                stream = await ytdl(song.url, { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" })
                stream.on("error", function (er) {
                    if (er) {
                        if (queue) {
                            queue.songs.shift();
                            play(queue.songs[0]);
                            return sendError(`Error ${er}`, message.channel);
                        }
                    }
                });
            }
        } catch (error) {
            console.log();
            if (queue) {
                queue.songs.shift();
                play(queue.songs[0]);
            }
        }
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
        const dispatcher = queue.connection.play(stream).on("finish", () => {
            const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            }
            play(queue.songs[0]);
        });
        if (client.user.lastMessage) {
            let msg = client.user.lastMessage
            msg.delete()

        }
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        let thing = new MessageEmbed()
        thing.setDescription(codeblock('Reproduciendo: ' + song.title + '. 🥶'))
        thing.setFooter('$play')
        thing.setColor(default_color)
        return message.channel.send(thing)
    };

    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        ;
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return sendError(`error: ${error}`, message.channel);
    }



}
async function Skip(client, message, args) {
    const { Util, MessageEmbed } = require("discord.js");

    const channel = message.member.voice.channel
    if (!channel) return message.channel.send(response(11))
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('no hay nada sonando')
    if (!serverQueue.connection) return
    if (!serverQueue.connection.dispatcher) return
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();

        return message.channel.send(serverQueue).catch(err => console.log(err));

    }


    try {
        serverQueue.connection.dispatcher.end()
    } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
    }
    message.react("✅")


}