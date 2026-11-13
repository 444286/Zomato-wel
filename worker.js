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

                                            if (msg.text === "/start") {

                                                  await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
                                                          method: "POST",
                                                                  headers: {
                                                                            "Content-Type": "application/json"
                                                                                    },
                                                                                            body: JSON.stringify({
                                                                                                      chat_id: msg.chat.id,
                                                                                                                text:
                                                                                                                `🌟 স্বাগতম ${msg.from.first_name}

                                                                                                                🛑কোনো এড ফি নেই ব রেফার করা ছাড়াই কাজ খুজছেন। পেমেন্ট পাবেন ১ঘন্টার মধ্যেই।

                                                                                                                তাহলে এখনই নিচের কাজ শুরু করুন বাটনে ক্লিক করুন 👇👇👇👇👇`,
                                                                                                                          reply_markup: {
                                                                                                                                      inline_keyboard: [
                                                                                                                                                    [
                                                                                                                                                                    {
                                                                                                                                                                                      text: "👉 কাজ শুরু করুন",
                                                                                                                                                                                                        web_app: {
                                                                                                                                                                                                                            url: "https://zomatobd.pages.dev"
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                                                                                          [{
                                                                                                                                                                                                                                                                                            "text": "🧾 টাকা উত্তোলনের প্রমাণ দেখুন",
                                                                                                                                                                                                                                                                                              "url": "https://t.me/zomato_app_payment_proof"
                                                                                                                                                                                                                                                                                              }], 
                                                                                                                                                                                                                                                                                                            [
                                                                                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                                                                                                              text: "🎥 কাজের নিয়মের ভিডিও দেখুন",
                                                                                                                                                                                                                                                                                                                                                                url: "https://youtube.com/shorts/q8499pfArbg?si=ag7wd6uFlN0NfFPP"
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                              ]
                                                                                                                                                                                                                                                                                                                                                                                                          ]
                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                                                          return new Response("ok");
                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                               


                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                            


}