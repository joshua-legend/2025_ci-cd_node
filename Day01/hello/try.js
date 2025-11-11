const prompt = require("prompt-sync")();

try {
  const test = +prompt("숫자 입력");
  if (isNaN(test)) throw Error("부대찌개 혈당스파이크 쀼쀼");
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}
