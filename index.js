require('dotenv').config();
global.fetch = require('node-fetch');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let today = new Date();
let thisYear = today.getFullYear();
let thisMonth = ("00"+(today.getMonth())).slice(-2);
let nextMonth = ("00" + (today.getMonth()+1)).slice(-2);
let heldThisMonth = String(thisYear)+String(thisMonth)
let heldNextMonth = String(thisYear)+String(nextMonth)


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.filter(ch => ch.name === '独り言').forEach(ch => ch.send('オンラインになりました。\n::+eventinfobotを起動します。'))
    async function callApi(){
        let url='https://connpass.com/api/v1/event/?keyword=テスト自動化&Count=10&ym='+heldThisMonth+'&ym='+heldNextMonth
        let encodeUrl = encodeURI(url);
        const res = await fetch(encodeUrl);
        const jData = await res.json();
        for (let i=0; i<10; i++){
            client.channels.cache.filter(ch => ch.name === '独り言').forEach(ch => ch.send(jData.events[i].title));
            // TODO : タイトルとイベントURLと開催日を追加
            // TODO : チャンネルを限定する式を簡単化
        }
    }

    callApi();
});

client.on('message', message => {

    // メッセージで検索できるようにしたい

});

client.login(process.env.DISCORD_TOKEN)