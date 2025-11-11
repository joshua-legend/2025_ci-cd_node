const { members } = require("./members");
const express = require("express");
const app = express();

// JSON 본문 파싱(해석) 가능하게 해줌
app.use(express.json());
// HTML form에서 전송된 데이터를 서버에서 읽을 수 있도록 옵션 설정 true
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>여진쓰 월드에 오신걸 환영합니다!</h1>");
});

app.get("/members", (req, res) => {
  // position
  const { position } = req.query;
  if (position) {
    res.json(members.filter((v) => v.position == position));
  }
  res.json(members);
});

app.get("/members/:id", (req, res) => {
  const { id } = req.params;
  if (+id < 0 || 3 < +id) res.send("<h1>그런 멤버 없습니다 ㅠㅠ </h1>");
  res.json(members[+id]);
});

app.post("/add", (req, res) => {
  const { name, age, position } = req.body;
  members.push({ name, age, position });
  res.json(`${name} 멤버가 추가되었습니다~🪐`);
});

app.listen(3000, () => {
  console.log("여진쓰는 시작된다🪐");
});
