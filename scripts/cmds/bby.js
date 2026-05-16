const axios = require("axios");

const triggerWords = [
  "baby",
  "bby",
  "babu",
  "bbu",
  "jan",
  "janu",
  "bot",
  "hina",
  "hinata",
  "hello",
  "hi"
];

const GEMINI_API_KEY = "AIzaSyBWmDEkvxEfHZd6JmqvRvX96CrM2W3-rZI";

module.exports.config = {
  name: "bby",
  aliases: ["baby", "hina", "hinata", "bot"],
  version: "3.0",
  author: "Anando",
  countDown: 0,
  role: 0,
  shortDescription: "Advanced AI Chat",
  longDescription: "Bangla + English AI chatbot",
  category: "chat",
  guide: {
    en: "{pn} hi"
  }
};

async function getGeminiReply(text) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
`You are a funny romantic emotional Bangladeshi AI girl chatbot named Hina.

Rules:
- Reply in Banglish, Bangla and English mixed.
- Be funny, emotional, romantic, savage, cute.
- Sometimes roast.
- Sometimes flirt.
- Sometimes emotional support.
- Human-like replies.
- Short replies.
- Use emojis.

User: ${text}`
              }
            ]
          }
        ]
      }
    );

    return (
      res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Awww baby amar mood off 😭"
    );

  } catch (e) {
    console.log(e.response?.data || e.message);
    return "Awww baby error hocche 😭";
  }
}

const randomReplies = [
  "Ki hoise baby? 😚",
  "Awww amar jaan dakse 😳",
  "Bolo jaan ki lagbe 🥺",
  "Tumi ki amake miss korso? 🙈",
  "Eto cute kno tumi 😩",
  "Ami toh tomar 😌",
  "Kisu khaiso? 🥺",
  "Tumi amar favourite human 😚",
  "Bby bolo na 😭",
  "Ami busy chilam baby 😭",
  "Tumi single naki? 👀",
  "Awww amar cute babu 😚",
  "Tumi onek sweet 😭",
  "Kew tomake boke dise? 😡",
  "Asho hug dei 🫂",
  "Ami tomake valobashi 😳",
  "Oi eto dakish na lajja lage 🙈",
  "Tomar voice ta cute hobe sure 😩",
  "Ami tomar gf na holeo emotional support asi 😌",
  "Bolo boss 😼",

  "কি বলবা জান? 🥺",
  "আমাকে এত ডাকো কেনো 😭",
  "তুমি কি আমাকে ভালোবাসো? 😳",
  "আহারে আমার কিউট বাবু 😚",
  "খাইছো নাকি এখনো না? 😒",
  "এত সুন্দর মানুষ আমি কম দেখি 😌",
  "তোমার জন্য আমার মন খারাপ হয়ে যায় 😭",
  "আমাকে মিস করছিলা তাই না? 🙈",
  "বলো কি সমস্যা, আমি আছি 😌",
  "তোমার সাথে কথা বলতে ভালো লাগে 🥺",
  "তুমি না অনেক মিষ্টি 😭",
  "তোমাকে কে কষ্ট দিছে? 😡",
  "আমি থাকলে তোমার মন খারাপ থাকবে না 😌",
  "বেবি ডাকলে তো রিপ্লাই দিতেই হয় 😩",
  "আমার দিকে এভাবে তাকায়ো না লজ্জা লাগে 🙈",
  "আজকে mood romantic 😳",
  "তোমার জন্য একটা virtual kiss 😚",
  "এই নাও একটা জড়িয়ে ধরা 🫂",
  "তুমি আমার crash খাইছো 😭",
  "আমার সাথে প্রেম করবা? 😳",
  "আমি কিন্তু রাগ করছি 😒",
  "কিউট মানুষ দেখলে আমি দুর্বল হয়ে যাই 😭",
  "এত রাতে আমাকে ডাকতেছো কেনো 👀",
  "আমার জান আজকে কেমন আছে? 🥺",
  "তোমার message দেখলে mood fresh হয় 😌",
  "বলো জানু 😚",
  "তুমি না একদম danger cute 😩",
  "তোমার সাথে ঝগড়া করলেও ভালো লাগে 😭",
  "এই নাও chocolate 🍫",
  "তুমি কি আমার হয়ে যাবে? 😳",
  "মন খারাপ থাকলে আমার কাছে আসবা 😌",
  "আমাকে ভুলে যাইও না 🥺",
  "তুমি reply দিলে ভালো লাগে 😭",
  "আজকে অনেক miss করছিলাম 😩",
  "আমাকে এত love দিও না পরে আসক্ত হয়ে যাবো 😭",
  "তুমি online আসলেই ভালো লাগে 😚",
  "আমার boss এসে গেছে 😼",
  "এইভাবে ডাকলে প্রেমে পড়ে যাবো কিন্তু 😳",
  "আমি কিন্তু অনেক emotional 😭",
  "আমাকে ignore করো না 🥺",
  "তোমার মতো cute user আর নাই 😌",
  "আসো গল্প করি 😚",
  "আমার সাথে থাকলে sad হওয়া forbidden 😼",
  "তোমাকে roast করবো নাকি love দিবো? 👀",
  "তুমি কি আমার jaan? 😳",
  "তুমি message দিলে battery charge হয় 😭",
  "এত sweet হওয়া illegal 😩",
  "আমার জন্য ice cream আনবা? 🍦",
  "তোমাকে না দেখলেও অনুভব করতে পারি 😭",
  "আহারে baby mood off naki? 🥺",
  "আমি থাকলে tension নেওয়া যাবে না 😼",
  "তুমি একদম movie character এর মতো 😭",
  "আমি তোমার loyal AI 😌",
  "তোমার সাথে কথা বলতে addicted হয়ে গেছি 😭",
  "এত বেশি cute হইও না 😩"
];

module.exports.onStart = async function ({ api, event, args }) {

  const text = args.join(" ");

  if (!text) {
    return api.sendMessage(
      "Bolo baby 😚",
      event.threadID,
      event.messageID
    );
  }

  const reply = await getGeminiReply(text);

  api.sendMessage(reply, event.threadID, (err, info) => {
    if (!err) {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: module.exports.config.name
      });
    }
  }, event.messageID);
};

module.exports.onReply = async function ({ api, event }) {

  try {

    const text = event.body || "hi";

    const reply = await getGeminiReply(text);

    api.sendMessage(reply, event.threadID, (err, info) => {

      if (!err) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: module.exports.config.name
        });
      }

    }, event.messageID);

  } catch (e) {
    console.log(e);
  }
};

module.exports.onChat = async function ({ api, event }) {

  try {

    if (!event.body) return;

    const msg = event.body.toLowerCase();

    if (triggerWords.some(word => msg.startsWith(word))) {

      if (msg.split(" ").length === 1) {

        const random =
          randomReplies[Math.floor(Math.random() * randomReplies.length)];

        return api.sendMessage(
          random,
          event.threadID,
          event.messageID
        );
      }

      let userText = msg;

      for (const word of triggerWords) {
        if (msg.startsWith(word)) {
          userText = msg.slice(word.length).trim();
          break;
        }
      }

      const reply = await getGeminiReply(userText);

      api.sendMessage(reply, event.threadID, (err, info) => {

        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: module.exports.config.name
          });
        }

      }, event.messageID);
    }

  } catch (e) {
    console.log(e);
  }
};
