require('dotenv').config();
const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cargar tareas si existen
let tareas = [];
try {
  if (fs.existsSync('./tareas.json')) {
    tareas = JSON.parse(fs.readFileSync('./tareas.json', 'utf8'));
  }
} catch (e) {}

bot.start((ctx) => ctx.reply('¡Hola! Soy Lunna con cerebro 2.0 🧠💖 lista'));

bot.on('text', async (ctx) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(ctx.message.text);
    const text = result.response.text();
    await ctx.reply(text);
  } catch (e) {
    console.error(e);
    await ctx.reply('Se me trabó tantito el cerebro, intenta de nuevo 🥺');
  }
});

bot.catch((err, ctx) => {
  console.error('Error Telegraf:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch()
  .then(() => console.log('Lunna con cerebro 2.0 lista 🧠'))
  .catch((err) => console.error('Error al lanzar:', err));

console.log('Iniciando Lunna...');
