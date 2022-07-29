const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const getDataFromDb = require('./services/db');
const bot = new Telegraf(process.env.BOT_TOKEN);

const States = {};

getDataFromDb().then(value => {
    let questions = '';
    value.forEach(element => {
        questions += `[${element.question}](${element.url})\n`;
    });
    bot.hears('FAQ', (ctx) => ctx.replyWithMarkdownV2(questions, {
        disable_web_page_preview: true
    }));
});

bot.hears('EMAIL', ctx => ctx.replyWithPhoto('https://memasno.ru/uploads/posts/2021-09/zaskamil-mamonta-chto-za-mem-pro-avito-mamont-kuda-perevodit-2.jpg'));

bot.start(ctx => ctx.reply('Шлом', Markup.keyboard([
    ['FAQ', 'EMAIL']
]).resize()));








bot.launch();