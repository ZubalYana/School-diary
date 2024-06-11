const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const PORT = 3000;
const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(TOKEN, { polling: true });

let users = [];

// Load users from file if it exists, otherwise create an empty file
const usersFilePath = path.join(__dirname, 'users.json');
if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
} else {
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(`Received message from chatId: ${chatId}`);

    if (!users.includes(chatId)) {
        users.push(chatId);
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        console.log(`Added new user: ${chatId}`);
    }
});

app.post('/send', (req, res) => {
    const { homework } = req.body;
    console.log(`Received homework to send: ${homework}`);

    const sendPromises = users.map(userId =>
        bot.sendMessage(userId, `Домашнє: ${homework}`)
    );

    Promise.all(sendPromises)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.sendStatus(500);
        });
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
