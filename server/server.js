const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// 어떤 경로로 요청하든 index.html을 전송
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});