const { cats } = require("./data");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("떼껄룩 월드 오신걸 환영합니다!");
});

app.get("/cats", (req, res) => {
  const { color } = req.query;
  if (color) {
    res.json(cats.filter((v) => v.color == color));
  }
  res.json(cats);
});

app.get("/cats/:id", (req, res) => {
  const { id } = req.params;
  const result = cats.find((v) => v.id == id);
  res.json(result || "404");
});

app.post("/cats", (req, res) => {
  const { name, age, color } = req.body;
  if (!name || !age || !color) res.json(`보낸 데이터가 유효하지 않습니다.`);
  else if (cats.some((v) => v.name == name)) res.json(`${name}이름은 중복입니다.`);
  else {
    cats.push({ name, age, color });
    res.json(`${name} 떼걸룩이 등록되었습니다!`);
  }
});

app.delete("/cats/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = cats.findIndex((v) => v.id == +id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 고양이 없습니다.` });
    return;
  }
  cats.splice(targetIndex, 1);
  res.json(id);
});

app.put("/cats/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = cats.findIndex((v) => v.id == +id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `${id} 고양이 없습니다.` });
    return;
  }

  const { name, age, color } = req.body;
  cats[targetIndex].name = name || cats[targetIndex].name;
  cats[targetIndex].age = age || cats[targetIndex].age;
  cats[targetIndex].color = color || cats[targetIndex].color;

  res.json({ msg: `${id} 고양이가 수정되었습니다.` });
});

app.listen(3000, () => {
  console.log("떼걸룩 월드 ON");
});
