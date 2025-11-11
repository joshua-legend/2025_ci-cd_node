const { icecreams } = require("./data");

const express = require("express");
const app = express();

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

app.listen(3000, () => {
  console.log("baskin rabbins 31 booting");
});
