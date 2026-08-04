const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;
const TUTORIAL_URL = process.env.TUTORIAL_URL;

const bot = new TelegramBot(BOT_TOKEN);

app.use(express.json());

app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`🌟 স্বাগতম, ${msg.from.first_name}

এখনই ওয়েব মিনি অ্যাপ ব্যবহার করে ইনকাম শুরু করুন।

📌 ভালো করে বোঝার জন্য প্রথমে টিউটোরিয়াল ভিডিওটি দেখে নিন।

👉 এখনই শুরু করতে নিচের বাটনে ক্লিক করুন।`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 ইনকাম শুরু করুন",
              web_app: {
                url: WEBAPP_URL
              }
            }
          ],
          [
            {
              text: "🎥 টিউটোরিয়াল দেখুন",
              url: TUTORIAL_URL
            }
          ]
        ]
      }
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot is running...");
});
