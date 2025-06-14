const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../my-app/build')));

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'normuser',
    password: 'ohs27122760',
    database: 'bluecap_db'
});


db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

//회원가입
app.post('/api/signup', (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ success: false, message: "모든 필드가 입력되지 않았습니다" });
  }

  //비밀번호 해싱
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Bcrypt 해싱 에러:', err);
      return res.status(500).json({ success: false, message: '서버에서 오류발생.' });
    }

    const sql = "INSERT INTO users (name, email, username, passworld) VALUES (?, ?, ?, ?)"
    const values = [name, email, username, hashedPassword];

    db.query(sql, values, (dbErr, result) => {
      if (dbErr) {
        console.error('MySQL 쿼리 에러:', dbErr);
        if (dbErr.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ success: false, message: '이미 사용 중인 아이디 또는 이메일입니다.' });
        }
        return res.status(500).json({ success: false, message: '데이터베이스 오류입니다.' });
      }

      console.log('회원가입 성공');
      res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.'});
    });
  });
});


app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '../my-app/build/.index.html'))
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});