const fs = require("fs"); // file-system
const prompt = require("prompt-sync")();
const name = prompt("당신의 이름은 무엇?");
const age = prompt("당신의 나이는 무엇?");
fs.writeFileSync("hello.xlsx", `이름:${name} 나이:${age}`, "utf-8");
