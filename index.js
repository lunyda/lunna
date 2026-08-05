require('dotenv').config();
const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const http = require('http');

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

bot.start((ctx) => ctx.reply('¡Hola! Soy Lunna con cerebro 2.0 🧠💖 lista'));

bot.on('text', async (ctx) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(ctx.message.text);
    await ctx.reply(result.response.text());
  } catch (e) {
    } catch (error) {
  console.error(error);
  ctx.reply("Error real: " + error.message)
}
  }
});

bot.catch((err) => console.error(err));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch().then(() => console.log('Lunna con cerebro 2.0 lista 🧠'));

console.log('Iniciando Lunna...');

// ESTO ES LO NUEVO QUE ARREGLA EL ERROR ROJO DE LA FOTO
http.createServer((req, res) => {
  res.end('Lunna online');
}).listen(process.env.PORT || 10000);
