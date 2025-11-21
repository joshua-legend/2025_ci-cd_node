const { data } = require("./data");
const express = require("express");
const app = express();

const students = [
  { name: "이영철", age: 25, gender: "male" },
  { name: "신여진", age: 26, gender: "female" },
  { name: "손정우", age: 25, gender: "male" },
  { name: "박신율", age: 31, gender: "male" },
];

const courses = [
  { name: "리눅스", timetable: ["sat", "sun"], teacher: "손흥민" },
  { name: "파이썬", timetable: ["mon", "wed", "fri"], teacher: "김민재" },
  { name: "자바", timetable: ["tue", "tus", "fri"], teacher: "황희찬" },
];

app.get("/students", (req, res) => {
  const { age, gender } = req.query;

  if (age && isNaN(+age)) {
    return res.json({ msg: "age값이 올바르지 않습니다." });
  }

  if (gender && !["male", "female"].includes(gender)) {
    return res.json({ msg: "gender값이 올바르지 않습니다." });
  }

  let result = [...students];

  if (age) {
    result = result.filter((v) => v.age == +age);
  }
  if (gender) {
    result = result.filter((v) => v.gender == gender);
  }

  res.json(result);
});

//Params[매개변수]
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  res.json(students[id] || "그런 학생 나감 ㅅㄱ");
});

app.get("/courses", (req, res) => {
  const { name, timetable, teacher } = req.query;

  //courses?name=c
  if (name && !["파이썬", "리눅스", "자바"].includes(name)) {
    return res.json({ msg: "name값이 올바르지 않습니다." });
  }

  if (timetable && !["sun", "mon", "tue", "wed", "thu", "fri", "sat"].includes(timetable)) {
    return res.json({ msg: "timetable값 올바르지 않습니다." });
  }

  if (teacher && !["손흥민", "김민재", "황희찬"].includes(teacher)) {
    return res.json({ msg: "teacher값 올바르지 않습니다." });
  }

  let result = [...courses];
  if (name) {
    result = result.filter((v) => v.name == name);
  }
  if (timetable) {
    result = result.filter((v) => v.timetable == timetable);
  }
  if (teacher) {
    result = result.filter((v) => v.teacher == teacher);
  }
  res.json(result);
});

// /humans
// ?langauge 없는 언어면 -> 해당 언어는 없습니다.
// ?company 없는 회사면 -> 해당 회사는 없습니다.
// ?departure  없는 부서면 -> 해당 부서는 없습니다.

app.get("/humans", (req, res) => {
  const { language, company, departure } = req.query;
  if (language && !data.some((v) => v.language == language)) {
    return res.json({ msg: `${language}는 없습니다.` });
  }
  if (company && !data.some((v) => v.company == company)) {
    return res.json({ msg: `${company}는 없습니다.` });
  }
  if (departure && !data.some((v) => v.departure == departure)) {
    return res.json({ msg: `${departure}는 없습니다.` });
  }

  let result = [...data];
  if (language) {
    result = result.filter((v) => v.language == language);
  }
  if (company) {
    result = result.filter((v) => v.company == company);
  }
  if (departure) {
    result = result.filter((v) => v.departure == departure);
  }
  res.json(result);
});

app.get("/languages", (req, res) => {
  const langauges = [...new Set(data.map((v) => v.language))].sort();
  res.json(langauges);
});

app.listen(3000, () => {
  console.log("서버 시즌 2 ON");
});
