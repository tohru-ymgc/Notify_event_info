require('dotenv').config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.filter(ch => ch.name === '独り言').forEach(ch => ch.send('オンラインになりました。\n::+文字入力でeventinfobotが起動します。'))
    var request = new XMLHttpRequest();
    let url='https://connpass.com/api/v1/event/?keyword=テスト自動化&ym=202112'
    let encodeUrl = encodeURI(url);
    request.open('GET', encodeUrl, true);
    request.responseType = 'json';
    request.onload = function () {
        // レスポンスが返ってきた時の処理 ここにメッセージを表示させるのかな
        client.channels.cache.filter(ch => ch.name === '独り言').forEach(ch => ch.send('API反応したよ'))
    }
    // リクエストをURLに送信
    request.send();
});

client.on('message', message => {
    if(message.author.bot) return;
    if ( message.content === "haruo world!") { 
        message.reply("三波春夫でございます！");
    }
});

client.login(process.env.DISCORD_TOKEN)