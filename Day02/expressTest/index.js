const fs = require("fs");
const text = fs.readFileSync("bake.txt", "utf-8");
const express = require("express");
const app = express();

// "/happy"
app.get("/happy", (req, res) => {
  res.send("Happy, Express!");
});

// "/ping"
app.get("/ping", (req, res) => {
  res.send("Pong, Express!");
});

app.get("/arombake", (req, res) => {
  res.json({ name: "아롬베이크", type: "빵집", rate: 4.7 });
});

app.get("/bake", (req, res) => {
  const arr = [];
  text.split("\n").forEach((v) => {
    const obj = {};
    v.split(",").forEach((pair) => {
      const [key, value] = pair.split(":");
      obj[key] = value;
    });
    arr.push(obj);
  });
  res.json(arr);
});

// 엑셀로 하셈쀼쀼

app.listen(3000, () => {
  console.log("실행!");
});
