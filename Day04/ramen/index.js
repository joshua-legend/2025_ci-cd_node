const { ramens, reviews } = require("./data");
const express = require("express");
const { v4 } = require("uuid");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("라면 월드 오신걸 환영합니다!");
});

app.get("/ramens", (req, res) => {
  const { spicyLevel } = req.query;
  if (spicyLevel) {
    res.json(ramens.filter((v) => v.spicyLevel == spicyLevel));
  }
  res.json(ramens);
});

app.get("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const result = ramens.find((v) => v.id == id);
  res.json(result || "404");
});

app.post("/ramens", (req, res) => {
  const { name, brand, soupType, spicyLevel } = req.body;
  if (!name || !brand || !soupType || !spicyLevel) res.json(`보낸 데이터가 유효하지 않습니다.`);
  else if (spicyLevel < 1 || 5 < spicyLevel) res.json(`spicyLevel 유효 하지 않습니다.(1~5 사이)`);
  else {
    ramens.push({ id: v4(), name, brand, soupType, spicyLevel });
    res.json(`${name} 라면 등록되었습니다!`);
  }
});

app.delete("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = ramens.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 라면이 없습니다.` });
    return;
  }
  ramens.splice(targetIndex, 1);
  res.json(id);
});

app.put("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = ramens.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 라면이 없습니다.` });
    return;
  }
  const { name, brand, spicyLevel } = req.body;
  ramens[targetIndex].name = name || ramens[targetIndex].name;
  ramens[targetIndex].brand = brand || ramens[targetIndex].brand;
  ramens[targetIndex].spicyLevel = spicyLevel || ramens[targetIndex].spicyLevel;
  res.json({ msg: `${id} 라면이 수정되었습니다.` });
});

app.get("/ramens/:id/reviews", (req, res) => {
  const { id } = req.params;
  const targetIndex = ramens.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(400).json({ msg: "해당 라면은 존재하지 않습니다." });
    return;
  }
  const targets = reviews.filter((v) => v.ramenID == id);
  res.json(targets);
});

app.post("/reviews", (req, res) => {
  const { nickname, contents, ramenID } = req.body;
  if (!nickname || !contents || !ramenID) {
    res.status(400).json({ msg: "데이터가 유효하지 않습니다." });
    return;
  }
  const targetIndex = ramens.findIndex((v) => v.id == ramenID);
  if (targetIndex == -1) {
    res.status(400).json({ msg: "해당 라면은 존재하지 않습니다." });
    return;
  }
  reviews.push({ id: v4(), nickname, contents, ramenID });
  res.json({ msg: "댓글이 생성되었습니다!" });
});

app.listen(3000, () => {
  console.log("라면 월드 ON");
});
