const express = require("express");
const app = express();
const { students } = require("./data");

app.get("/", (req, res) => {
  res.send("도시락 파티 오신걸 환영합니다!");
});

// 쿼리스트링(옵션붙히기): ?k=v&k=v
// ?name
// ?menu
app.get("/list", (req, res) => {
  const { menu } = req.query;

  if (menu) {
    const result = students.filter((v) => v.menu.includes(menu));
    res.json(result || `${menu}를 가진 학생은 없습니다`);
  }
  res.json(students);
});

app.get("/list/:num", (req, res) => {
  const { num } = req.params;
  if (+num < 0 || 3 < +num) {
    res.send("그런 도시락 없음 ㅅㄱ");
  } else {
    res.json(students[+num]);
  }
});

app.listen(3000, () => {
  console.log("Lunch Box is Booting!");
});
