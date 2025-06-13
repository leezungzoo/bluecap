const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '../my-app/build/.index.html'))
});

app.listen(PORT, () => {
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});