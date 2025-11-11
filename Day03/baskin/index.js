const { icecreams } = require("./data");
const express = require("express");
const app = express();

// JSON 본문 파싱(해석) 가능하게 해줌
app.use(express.json());
// HTML form에서 전송된 데이터를 서버에서 읽을 수 있도록 옵션 설정 true
app.use(express.urlencoded({ extended: true }));

// http: request - method[GET(가져오기),POST(생성하기)]
app.get("/", (req, res) => {
  res.send("<h1>베라베라 맛있는 베라 어서오고</h1>");
});

app.get("/menu", (req, res) => {
  const { underKcal, flavor } = req.query;
  if (underKcal) {
    res.json(icecreams.filter((v) => v.kcal <= underKcal));
  }
  if (flavor) {
    res.json(icecreams.filter((v) => v.flavor.includes(flavor)));
  }
  res.json(icecreams);
});

app.get("/menu/:id", (req, res) => {
  const { id } = req.params;
  if (+id < 0 || 3 < +id) res.send("그런 아이스크림 없습니다 쀼쀼");
  res.json(icecreams[+id]);
});

app.post("/add", (req, res) => {
  const { name, kcal, flavor1, flavor2 } = req.body;
  icecreams.push({ name, kcal, flavor1, flavor2 });
  res.json(`${name} 아이스크림이 추가 됐습니다!`);
});

app.listen(3000, () => {
  console.log("baskin rabbins 31 booting");
});
