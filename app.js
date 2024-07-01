const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const PORT = 3000;
const TOKEN = '7434998252:AAGvjoW9XAUQUbgNwN0YQs7cbsSMrooX8BA'; 
const bot = new TelegramBot(TOKEN, {});

const usersFilePath = path.join(__dirname, 'users.json');
let users = [];

if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    if (!users.includes(chatId)) {
        users.push(chatId);
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
    }

    bot.sendMessage(chatId, "Welcome! You've activated the bot.");
});

app.post('/send', (req, res) => {
    console.log(req.body.message)
    const message = req.body.message;

    users.forEach(userId => {
        bot.sendMessage(userId, message);
    });

    res.sendStatus(200);
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


// const express = require('express');
// const app = express();
// const path = require('path');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const TelegramBot = require('node-telegram-bot-api');

// const PORT = 3000;
// const TOKEN = '7434998252:AAGvjoW9XAUQUbgNwN0YQs7cbsSMrooX8BA';
// const bot = new TelegramBot(TOKEN, { polling: true });

// // File to store chat IDs
// const CHAT_IDS_FILE = 'chat_ids.json';

// // Helper function to read chat IDs from file
// function getChatIds() {
//     if (fs.existsSync(CHAT_IDS_FILE)) {
//         return JSON.parse(fs.readFileSync(CHAT_IDS_FILE));
//     }
//     return [];
// }

// // Helper function to save chat IDs to file
// function saveChatIds(chatIds) {
//     fs.writeFileSync(CHAT_IDS_FILE, JSON.stringify(chatIds));
// }

// // Middleware to parse incoming requests
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());

// // Route to serve the main page
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Route to serve the admin page
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin.html'));
// });

// // Endpoint to send message to all users
// app.post('/send', (req, res) => {
//     const message = req.body.message;
//     const chatIds = getChatIds();

//     chatIds.forEach(chatId => {
//         bot.sendMessage(chatId, message)
//             .catch(error => console.error(`Failed to send message to ${chatId}:`, error));
//     });

//     res.send('Message sent to all users.');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on PORT: ${PORT}`);
// });

// // Handle incoming messages
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const chatIds = getChatIds();

//     if (!chatIds.includes(chatId)) {
//         chatIds.push(chatId);
//         saveChatIds(chatIds);
//     }

//     bot.sendMessage(chatId, 'You are now registered to receive updates.');
// });
