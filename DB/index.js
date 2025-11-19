const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "koreait",
  connectionLimit: 10,
});

app.get("/boards", async (req, res) => {
  const [data] = await pool.query("select * from boards");
  res.json(data);
});

app.post("/boards", async (req, res) => {
  const { author, title, contents } = req.body;
  const sql = `insert into boards (author, title, contents) values (?, ?, ?)`;
  const [result] = await pool.execute(sql, [author, title, contents]);
  res.json({ msg: `${result.insertId} 만들어짐!` });
});

app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`delete from boards where id = ${id}`);
  res.json({ msg: `데이터 삭제 완료` });
});

app.put("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const { author, title, contents } = req.body;
  const sql = `update boards set author = ? , title = ? , contents = ? where id = ${id}`;
  const [result] = await pool.execute(sql, [author, title, contents]);
  res.json({ msg: `${result.insertId}가 수정됨!` });
});

app.listen(3000, () => {
  console.log("서버 켜짐 ㅅㄱ");
});
