const express = require('express');
const app = express()
const path = require('path')
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')))
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '6518352627:AAHArq4zdmt02-3Uec_xN0a3k08jeEHC1TM';
const bot = new TelegramBot(TOKEN, { polling: false });
app.post('/send', (req, res)=>{
    const { homework } = req.body;
    console.log(homework);
    bot.sendMessage(1132590035, `Домашнє: ${homework}`);
    res.sendStatus(200);
})
app.get('/', (req, res)=>{
    res.sendFile(__dirname, 'public', 'index.html')
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin'));
})
app.listen(PORT, ()=>{
    console.log(`Server work on PORT: ${PORT}`);
})