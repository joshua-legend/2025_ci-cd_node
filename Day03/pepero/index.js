const express = require("express");
const app = express();
const getPepero = require("./pepero_data");

app.get("/", (req, res) => {
  res.send("<h1>빼빼로 월드에 오신걸 환영합니다.</h1>");
});

app.get("/list", async (req, res) => {
  const data = await getPepero();
  res.json(data);
});

// 동적 파라메터
app.get("/list/:abc", async (req, res) => {
  const { abc } = req.params;
  const data = await getPepero();
  res.json(data[+abc - 1]);
});

app.listen(3000, () => {
  console.log("Pepero Server is Booting!");
});
