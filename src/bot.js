require("dotenv").config();
const shell = require("shelljs");

const { Telegraf } = require("telegraf");

const { DAN_BOT_TOKEN } = process.env;

const bot = new Telegraf(DAN_BOT_TOKEN);

// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();

bot.start((ctx) =>
  ctx.reply(
    `Hello, ${ctx.message.from.first_name}! I'm Dan. I can deploy soYummy on Vercel, just type 'deploy'`
  )
);

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears("hello", (ctx) =>
  ctx.reply(`Hello, ${ctx.message.from.first_name}!`)
);
bot.hears("about", (ctx) =>
  ctx.reply(
    "I'm a small bot and can deploy soYummy on Vercel yet. ) Type 'deploy' and I will do it."
  )
);

bot.hears("deploy", (ctx) => {
  shell.exec("/home/reen/soyummy/deploy_soyummy.sh");
  ctx.reply("Done");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
