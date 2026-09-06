// app.js
const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT ||  3000;
const startTime = Date.now();
let heartbeats = 0;

app.get('/', (req, res) => {
  heartbeats++;
  const uptimeSec = Math.floor((Date.now() - startTime) / 1000);

  res.json({
    message: '🐳 Hello from inside a container!',
    hostname: os.hostname(),          // changes per container — great for load-balancer demos
    platform: os.platform(),
    uptimeSeconds: uptimeSec,
    requestsServed: heartbeats,
    env: process.env.NODE_ENV  'development',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');         // useful for EC2 target group health checks
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(🚀 Server running on port ${PORT} (host: ${os.hostname()}));
});
