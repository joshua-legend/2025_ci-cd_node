const { members } = require("./data");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🪐여진쓰 월드🪐");
});

app.get("/members", (req, res) => {
  const { position } = req.query;
  if (position) {
    const targets = members.filter((v) => v.position == position);
    res.json(targets);
    return;
  }
  res.json(members);
});

app.get("/members/:id", (req, res) => {
  const { id } = req.params;

  const targetIndex = members.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(400).json({ msg: "그런 멤버 없어!" });
    return;
  }
  res.json(members[targetIndex]);
});

app.post("/members", (req, res) => {
  const { name, age, position } = req.body;
  if (!name || !age || !position) {
    res.status(400).json({ msg: "데이터가 유효하지 않습니다." });
    return;
  }
  members.push({ id: members.length, name, age, position });
  res.json({ msg: `${name}멤버가 등록되었습니다.🚀` });
});

app.delete("/members/:id", (req, res) => {
  const { id } = req.params;

  const targetIndex = members.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(400).json({ msg: "그런 멤버 없어요!" });
    return;
  }

  const name = members[targetIndex].name;
  members.splice(targetIndex, 1);
  members.map((v, i) => ({ ...v, id: i }));
  res.json({ msg: `슬프지만 ${name} 멤버가 탈퇴 했습니다.` });
});

app.put("/members/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, position } = req.body;

  const targetIndex = members.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.status(400).json({ msg: "그런 멤버 없어요!" });
    return;
  }

  members[targetIndex].name = name || members[targetIndex].name;
  members[targetIndex].age = age || members[targetIndex].age;
  members[targetIndex].position = position || members[targetIndex].position;
  res.json({ msg: `${name}멤버가 수정되었습니다!` });
});

app.listen(3000, () => {
  console.log("여진쓰 월드 Booting!");
});
