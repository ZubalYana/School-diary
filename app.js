const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const PORT = 3000;
const TOKEN = '6518352627:AAHArq4zdmt02-3Uec_xN0a3k08jeEHC1TM'; 
const bot = new TelegramBot(TOKEN, { polling: true });

const usersFilePath = path.join(__dirname, 'users.json');
let users = [];

if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Received message from chatId: ${chatId}`);

    if (!users.includes(chatId)) {
        users.push(chatId);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        console.log(`Added new user: ${chatId}`);
    }
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Response");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});