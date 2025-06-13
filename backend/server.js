const express = require('express');
//const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

/*  db 사용 예정 시 주석 해제
const db = mysql.createConnection({
  host:
  user:
  password:
  database:
});


db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});


app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

*/

app.listen(3001, () => {
  console.log('Backend running at http://localhost:3001');
});