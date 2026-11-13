export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("Bot Running ✅");
    }

    try {
      const update = await request.json();

      if (!update.message) {
        return new Response("ok");
      }

      const msg = update.message;
      const chatId = msg.chat.id;
      const text = msg.text || "";

      // =========================
      // /start
      // =========================

      if (text === "/start") {

        await env.USERS.put(
          String(chatId),
          JSON.stringify({
            chat_id: chatId,
            first_name: msg.from?.first_name || "",
            username: msg.from?.username || ""
          })
        );

        await sendMessage(
          env,
          chatId,
          `🌟 Hello ${msg.from?.first_name || ""}
নিচের ইনকাম শুরু করুন বাটনে ক্লিক করুন।

🖲️ নিচের বাটনে ক্লিক করুন 👇👇👇👇`
        );

        return new Response("ok");
      }

      return new Response("ok");

    } catch (error) {

      console.log("Webhook error:", error);

      return new Response("ok");
    }
  },


  // ==========================================
  // CRON
  // ==========================================

  async scheduled(event, env, ctx) {

    console.log(
      "🔥 CRON STARTED:",
      new Date().toISOString()
    );

    console.log(
      "🔥 CRON:",
      event.cron
    );


    let cursor = undefined;

    let totalUsers = 0;
    let totalSent = 0;
    let totalFailed = 0;


    // ==========================================
    // MESSAGE
    // ==========================================

    const message = `💰 ইনকাম করার সুযোগ মিস করছেন?
আপনার আজকের কাজগুলো এখনো অপেক্ষায় আছে!

নিচের বাটনে ক্লিক করে এখনই কাজ শুরু করুন 👇`;


    // ==========================================
    // KV PAGINATION
    // ==========================================

    do {

      const options = {
        limit: 1000
      };

      if (cursor) {
        options.cursor = cursor;
      }


      const list = await env.USERS.list(options);


      console.log(
        `📦 KV page: ${list.keys.length} users`
      );


      // ==========================================
      // GET USERS
      // ==========================================

      const userList = [];


      for (const key of list.keys) {

        try {

          const data =
            await env.USERS.get(key.name);

          if (!data) {
            continue;
          }

          const user = JSON.parse(data);

          if (!user.chat_id) {
            continue;
          }

          userList.push(user);

        } catch (error) {

          console.log(
            "User read error:",
            key.name,
            error
          );

        }
      }


      totalUsers += userList.length;


      // ==========================================
      // BATCH SEND
      // ==========================================

      const BATCH_SIZE = 20;


      for (
        let i = 0;
        i < userList.length;
        i += BATCH_SIZE
      ) {

        const batch =
          userList.slice(
            i,
            i + BATCH_SIZE
          );


        const results =
          await Promise.all(

            batch.map(async (user) => {

              try {

                const success =
                  await sendMessage(
                    env,
                    user.chat_id,
                    message
                  );

                return success;

              } catch (error) {

                console.log(
                  "Send error:",
                  user.chat_id,
                  error
                );

                return false;
              }

            })

          );


        for (const success of results) {

          if (success) {
            totalSent++;
          } else {
            totalFailed++;
          }

        }


        // Telegram rate limit এড়াতে
        // প্রতিটি batch-এর মাঝে ছোট delay

        if (i + BATCH_SIZE < userList.length) {

          await sleep(1000);

        }

      }


      // ==========================================
      // NEXT PAGE
      // ==========================================

      if (list.list_complete) {

        cursor = undefined;

      } else {

        cursor = list.cursor;

      }


    } while (cursor);


    // ==========================================
    // FINAL LOG
    // ==========================================

    console.log(
      "================================"
    );

    console.log(
      "🔥 CRON FINISHED"
    );

    console.log(
      "👥 Total users:",
      totalUsers
    );

    console.log(
      "✅ Sent:",
      totalSent
    );

    console.log(
      "❌ Failed:",
      totalFailed
    );

    console.log(
      "================================"
    );
  }
};


// ==========================================
// TELEGRAM SEND MESSAGE
// ==========================================

async function sendMessage(
  env,
  chatId,
  message
) {

  try {

    const response = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          chat_id: chatId,

          text: message,

          reply_markup: {

            inline_keyboard: [

              [
                {
                  text: "🚀 ইনকাম শুরু করুন",

                  web_app: {
                    url:
                      "https://zomatoplatform.pages.dev"
                  }
                }
              ]

            ]

          }

        })
      }
    );


    const result =
      await response.json();


    if (!result.ok) {

      console.log(
        "❌ Telegram API error:",
        chatId,
        result
      );

      return false;
    }


    return true;


  } catch (error) {

    console.log(
      "❌ Telegram request error:",
      chatId,
      error
    );

    return false;
  }
}


// ==========================================
// DELAY
// ==========================================

function sleep(ms) {

  return new Promise(
    resolve => setTimeout(resolve, ms)
  );

        }