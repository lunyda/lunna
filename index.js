require('http').createServer((req,res) => res.end('Lunna OK')).listen(process.env.PORT || 3000);
require('dotenv').config();
const TelegramBotModule = require('node-telegram-bot-api');
const TelegramBot = TelegramBotModule.default || TelegramBotModule;
const fs = require('fs');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
let tareas = [];
if (fs.existsSync('tareas.json')) {
  tareas = JSON.parse(fs.readFileSync('tareas.json'));
}
function guardar() {
  fs.writeFileSync('tareas.json', JSON.stringify(tareas, null, 2));
}
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hola Luna! Soy tu bot 🌙\n/tarea comprar pan\n/hoy\n/dinero\n/borrar`);
});
bot.onText(/\/tarea (.+)/, (msg, match) => {
  tareas.push({ texto: match[1], fecha: new Date().toLocaleDateString() });
  guardar();
  bot.sendMessage(msg.chat.id, `Guardado: "${match[1]}" ✅`);
});
bot.onText(/\/hoy/, (msg) => {
  if (tareas.length === 0) bot.sendMessage(msg.chat.id, "No tienes tareas 🎉");
  else {
    let lista = "Tus tareas:\n";
    tareas.forEach((t, i) => lista += `${i+1}. ${t.texto}\n`);
    bot.sendMessage(msg.chat.id, lista);
  }
});
bot.onText(/\/dinero/, (msg) => {
  bot.sendMessage(msg.chat.id, `Con $27,500:\n- $11,000 -> GBM (VOO)\n- $3,000 -> CETES\n- $13,500 -> vivir\nMándalo HOY`);
});
bot.onText(/\/borrar/, (msg) => {
  tareas = []; guardar();
  bot.sendMessage(msg.chat.id, "Borradas 🗑️");
});
console.log("Bot encendido...");
