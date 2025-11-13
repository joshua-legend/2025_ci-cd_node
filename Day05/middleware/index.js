const express = require("express");
const morgan = require("morgan");
const joi = require("joi");
const { responseFormater } = require("./func");
const { members } = require("./data");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 메서드, URL, 상태코드, 응답시간
app.use(morgan("dev"));
app.use(responseFormater);

const nyah = (req, res, next) => {
  console.log("메롱😛");
  next();
};

app.get("/", (req, res) => {
  res.success("메인 페이지");
});
app.get("/yeojin", nyah, (req, res) => {
  res.success("여진쓰 월드");
});
app.get("/doquite", nyah, (req, res) => {
  res.success("도콰이엇 월드");
});

app.get("/members", (req, res) => {
  res.success(members);
});

const schema = joi.object({
  name: joi.string(),
  age: joi.number().integer().min(19),
  position: joi.string().valid("vocal", "rapper", "dancer"),
});

const checkBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json({ msg: "ㅗ" });
  next();
};

app.post("/members", checkBody, (req, res) => {
  const { name, age, position } = req.body;
  members.push({ name, age, position });
  res.success("멤버가 추가되었습니다!");
});

app.put("/members", (req, res) => {
  const { name, age, position } = req.body;
  if (!name || !age || !position) {
    res.json("데이터가 유효하지 않습니다");
    return;
  }
  const targetIndex = members.findIndex((v) => v.name == name);
  members[targetIndex].name = name || members[targetIndex].name;
  members[targetIndex].age = age || members[targetIndex].age;
  members[targetIndex].position = position || members[targetIndex].position;
  res.success(`멤버가 수정되었습니다.`);
});

app.listen(3000, () => {
  console.log("서버 on");
});
