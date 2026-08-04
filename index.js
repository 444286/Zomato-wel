export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Bot Running ✅");
    }

    const update = await request.json();

    if (!update.message || !update.message.text) {
      return new Response("ok");
    }

    const msg = update.message;

    if (msg.text === "/start") {

      const body = {
        chat_id: msg.chat.id,
        text: `🌟 স্বাগতম ${msg.from.first_name}

এখনই Mini App ব্যবহার করে ইনকাম শুরু করুন।

👇 নিচের বাটনে ক্লিক করুন`,
        reply_markup: {
          inline_keyboard: [
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
                text: "📢 Join Telegram Channel",
                url: "https://t.me/YOUR_CHANNEL_USERNAME"
              }
            ],
            [
              {
                text: "🎥 টিউটোরিয়াল দেখুন",
                url: "https://youtube.com/shorts/q8499pfArbg?si=ag7wd6uFlN0NfFPP"
              }
            ]
          ]
        }
      };

      const tg = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const result = await tg.text();

      return new Response(result, {
        headers: {
          "content-type": "application/json"
        }
      });
    }

    return new Response("ok");
  }
}