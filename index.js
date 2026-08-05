const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

bot.on('text', async (ctx) => {
  try {
    const prompt = ctx.message.text;
    await ctx.sendChatAction('typing');
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    await ctx.reply(response);
  } catch (e) {
    console.log(e);
    await ctx.reply('Se me trabó tantito, intenta de nuevo');
  }
});

bot.launch();
console.log('Lunna con cerebro 2.0 lista 🧠');
