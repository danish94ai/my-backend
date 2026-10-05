const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const TELEGRAM_BOT_TOKEN = '8957531455:AAHSFSNVTbUb4cU721SVdu-VXGfZG3ME-Y';
const TELEGRAM_CHAT_ID = '7611064372';

// Form submit hone par Telegram par data bhejne ka route
app.post('/submit', (req, res) => {
    const { name, phone, group, section, attendance, branch, enrollment } = req.body;

    const message = `🎓 *New Student Attendance*:\n\n` +
                    `👤 *Name*: ${name}\n` +
                    `📞 *Phone*: ${phone}\n` +
                    `👥 *Group*: ${group}\n` +
                    `🏫 *Section*: ${section}\n` +
                    `📋 *Attendance*: ${attendance}\n` +
                    `🏛️ *Branch*: ${branch}\n` +
                    `🆔 *Enrollment*: ${enrollment}`;

    const textParam = encodeURIComponent(message);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${textParam}&parse_mode=Markdown`;

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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'attendance.html')); // Yahan apni HTML file ka naam likh dena jo tumhari directory mein hai
});

// Server ko port par chalane ke liye
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.net?.(`Server is running on port ${PORT}`) || console.log(`Server is running on port ${PORT}`);
});