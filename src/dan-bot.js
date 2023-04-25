require("dotenv").config();
const shell = require("shelljs");

const TelegramBot = require("node-telegram-bot-api");

const { DAN_BOT_TOKEN } = process.env;

const bot = new TelegramBot(DAN_BOT_TOKEN, { polling: true });

// **
bot.setMyCommands([
  { command: "/deploy", description: "greeting" },
  // { command: "/about", description: "about me" },
  // { command: "/task", description: "task for me" },
]);

const chats = {};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Hello, ${firstName}! I'm Dan. I can deploy soYummy on Vercel, just type 'deploy'`
      );
      return;
    }

    if (text === "about") {
      await bot.sendMessage(
        chatId,
        "I'm a small bot and can deploy soYummy on Vercel yet. ) Type 'deploy' and I will do it."
      );
      return;
    }
    if (text === "hi" || text === "Hi") {
      await bot.sendMessage(chatId, "Hey there");
      return;
    }

    if (text === "hello" || text === "Hello") {
      await bot.sendMessage(chatId, `Hello, ${firstName}!`);
      return;
    }
    if (text === "/deploy" || text === "deploy" || text === "Deploy") {
      await bot.sendMessage(chatId, "I'm working ... )");
      shell.cd("/home/reen/soyummy");
      shell.exec("./deploy_soyummy.sh");
      await bot.sendMessage(chatId, "Done 👍");
      return;
    }
    await bot.sendMessage(
      chatId,
      "I'm sorry, I didn't catch that, can you say it again? "
    );
    return;
  });

  // bot.on("callback_query", (msg) => {
  //   // console.log(msg);

  //   const data = msg.data;
  //   const chatId = msg.message.chat.id;

  //   bot.sendMessage(chatId, `You chose ${data} `);
  //   return;
  // });
};

start();
