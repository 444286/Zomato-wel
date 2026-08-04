export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Bot Running ✅");
    }

    const update = await request.json();

    if (!update.message) {
      return new Response("ok");
    }

    const msg = update.message;
    const text = msg.text;

    // /start
    if (text === "/start") {

      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text:
`🌟 স্বাগতম ${msg.from.first_name}

এখনই Mini App ব্যবহার করে ইনকাম শুরু করুন।

নিচের বাটনে ক্লিক করুন 👇`,
          reply_markup: {
            keyboard: [
              [
                {
                  text: "🚀 ইনকাম শুরু করুন",
                  web_app: {
                    url: "https://zomatobd.pages.dev"
                  }
                }
              ],
              [
                {
                  text: "📢 Join Telegram Channel"
                }
              ],
              [
                {
                  text: "🎥 টিউটোরিয়াল দেখুন"
                }
              ]
            ],
            resize_keyboard: true,
            persistent: true
          }
        })
      });

      return new Response("ok");
    }

    // Channel Button
    if (text === "📢 Join Telegram Channel") {
      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text: "📢 আমাদের Telegram Channel:",
          reply_markup: {
            inline_keyboard: [[
              {
                text: "➡️ Channel Open",
                url: "https://t.me/তোমার_চ্যানেল"
              }
            ]]
          }
        })
      });

      return new Response("ok");
    }

    // Tutorial Button
    if (text === "🎥 টিউটোরিয়াল দেখুন") {
      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text: "🎥 টিউটোরিয়াল ভিডিও:",
          reply_markup: {
            inline_keyboard: [[
              {
                text: "▶️ ভিডিও দেখুন",
                url: "https://youtube.com/shorts/q8499pfArbg?si=ag7wd6uFlN0NfFPP"
              }
            ]]
          }
        })
      });

      return new Response("ok");
    }

    return new Response("ok");
  }
                                                 }
