const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (frontend files serve karne ke liye)
app.use(express.static(path.join(__dirname)));

// Aapka Telegram Bot Token aur Chat ID
const TELEGRAM_BOT_TOKEN = '8957531455:AAHSFSNVTbUb4cU721SVdu-VXGfZG3ME-Y';
const TELEGRAM_CHAT_ID = '7611064372';

// Form submit hone par yeh route chalega
app.post('/submit', (req, res) => {
    const { name, phone, group, section, attendance, branch, enrollment } = req.body;

    // Telegram message format
    const message = `🎓 *New Student Attendance*:\n\n` +
                    `👤 *Name*: ${name}\n` +
                    `📞 *Phone*: ${phone}\n` +
                    `👥 *Group*: ${group}\n` +
                    `🏫 *Section*: ${section}\n` +
                    `📋 *Attendance*: ${attendance}\n` +
                    `🏛️ *Branch*: ${branch}\n` +
                    `🆔 *Enrollment*: ${enrollment}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    https.get(url, (telegramRes) => {
        let data = '';
        telegramRes.on('data', (chunk) => { data += chunk; });
        telegramRes.on('end', () => {
            console.log("Telegram Response:", data);
            res.status(200).send({ success: true });
        });
    }).on('error', (err) => {
        console.log("Error:", err.message);
        res.status(500).send({ success: false });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});