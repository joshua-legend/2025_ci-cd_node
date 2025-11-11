const fs = require("fs");
const prompt = require("prompt-sync")();
const contents = prompt("오늘 일기 쓰셈:");
fs.writeFileSync(`diary_${new Date().toLocaleDateString().replaceAll(" ", "")}txt`, contents, "utf-8");
