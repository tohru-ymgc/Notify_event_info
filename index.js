require('dotenv').config();
global.fetch = require('node-fetch');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// HACK : 日付部分もっとすっきりさせたい
let day = new Date();
let thisYear = day.getFullYear();
let thisMonth = ("00"+(day.getMonth()+1)).slice(-2);
let thisDay = ("00" + (day.getDate())).slice(-2);
let nextMonth = ("00" + (day.getMonth()+2)).slice(-2);
let heldThisMonth = String(thisYear)+String(thisMonth);
let heldNextMonth = String(thisYear)+String(nextMonth);
let today = String(thisYear)+String(thisMonth)+String(thisDay);

async function callApi(){
    let url='https://connpass.com/api/v1/event/?keyword=テスト自動化&Count=10&ym='+heldThisMonth+'&ym='+heldNextMonth
    let encodeUrl = encodeURI(url);
    const res = await fetch(encodeUrl);
    const jData = await res.json();
    let max = 0;
    if(jData.results_available > 10){
        max = 10;
    }else{
        max = jData.results_available
    }

    // HACK : メッセージに返す処理はcallAPIと分割させたい

    for (let i=0; i<max; i++){
        let eventStart=jData.events[i].started_at;
        let eventStartDate = eventStart.slice(0,10);
        let eventStartDay = eventStartDate.replace(/-/g,"");
        if(Number(eventStartDay)>Number(today)){
            client.channels.cache.find(ch => ch.name === '一般').send("\n-----");
            client.channels.cache.find(ch => ch.name === '一般').send(jData.events[i].title);
            client.channels.cache.find(ch => ch.name === '一般').send(jData.events[i].started_at);
            client.channels.cache.find(ch => ch.name === '一般').send(jData.events[i].event_url);
        }
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.find(ch => ch.name === '一般').send("オンラインになりました。\nテスト自動化に関するイベントを通知します。");
    callApi();
});

client.on('message', message => {

    // NOTE : メッセージで検索キーワードを変えるようにしたい

});

client.login(process.env.DISCORD_TOKEN)