const {
    Telegraf,
    Markup
} = require('telegraf');
require('dotenv').config();
const getDataFromDb = require('./services/db');
const sendEmail = require('./services/mail');
const bot = new Telegraf(process.env.BOT_TOKEN);

const States = {
    NORMAL: 'normal',
    EMAIL: 'email'
};
let botState = States.NORMAL;

bot.start(ctx => ctx.reply('Выбирай', Markup.keyboard([
    ['FAQ', 'EMAIL']
]).resize()));

getDataFromDb().then(value => {
    let questions = '';
    value.forEach(element => {
        questions += `[${element.question}](${element.url})\n`;
    });
    bot.hears('FAQ', (ctx) => ctx.replyWithMarkdownV2(questions, {
        disable_web_page_preview: true
    }));
});

bot.hears('Назад', ctx => {
    ctx.reply('Выбирай', Markup.keyboard([
        ['FAQ', 'EMAIL']
    ]).resize());
    botState = States.NORMAL;
});

bot.hears('EMAIL', ctx => {
    ctx.reply('Задайте свой вопрос и обязательно укажите свой email для обратной связи!', Markup.keyboard([
        ['Назад']
    ]).resize());
    botState = States.EMAIL;
});

bot.on('text', (ctx, next) => {
    switch(botState){
        case States.NORMAL:
            next();
            break;

        case States.EMAIL:
            sendEmail(ctx.message.text);
            ctx.reply('Выбирай', Markup.keyboard([
                ['FAQ', 'EMAIL']
            ]).resize());
            botState = States.NORMAL;
            break;
    }
});

bot.launch();