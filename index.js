const { Telegraf } = require('telegraf');
require('dotenv').config();
const getDataFromDb = require('./services/db');
const bot = new Telegraf(process.env.BOT_TOKEN);

const States = {};

getDataFromDb().then(value => {
    let questions = '';
    value.forEach(element => {
        questions += `[${element.question}](${element.url})\n`;
    });
    bot.start((ctx) => ctx.replyWithMarkdownV2(questions, {
        disable_web_page_preview: true
    }));
});








bot.launch();