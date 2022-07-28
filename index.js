const {
    Telegraf
} = require('telegraf');
require('dotenv').config();
const States = {};

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.start((ctx) => ctx.replyWithSticker("CAACAgIAAxkBAAIBqmLhRjmO2hrQVJ95SR-J3NON85a4AAKuAAM9zOMzAAE7Fuq_Cg_WKQQ"));
bot.start((ctx) => ctx.replyWithMarkdownV2("[Вопрос 1](https://i.pinimg.com/736x/7b/19/bc/7b19bc6569545fbabdb941a5eed1f260.jpg)", {
    disable_web_page_preview: true
}));


// bot.on('sticker', (ctx) => {
//     ctx.reply('ЫЫЫЫ блять');
//     console.log(ctx.message.sticker.file_id);
// });
// bot.command('oldscool', ctx => ctx.reply('Ы'));
bot.launch();