const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("Lunna con cerebro de Gemini lista...");

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (!text) return;

  // Para no responder a comandos
  if (text.startsWith('/')) {
     if (text === '/start') {
        bot.sendMessage(chatId, "¡Hola! Soy Lunna 🌙✨ Ya puedo investigar, resumir y ayudarte como ChatGPT. ¿Qué quieres saber?");
     }
     return;
  }

  bot.sendChatAction(chatId, 'typing');

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Eres Lunna, una asistente muy amable, divertida y útil. Responde corto, claro y en español. Pregunta del usuario: ${text}`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    bot.sendMessage(chatId, response);
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, "Ay, me trabé un segundo 🥺 inténtalo de nuevo.");
  }
});
