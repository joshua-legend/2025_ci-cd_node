const fs = require("fs");
const text = fs.readFileSync("bake.txt", "utf-8");
const arr = [];
text.split("\n").forEach((v) => {
  const obj = {};
  v.split(",").forEach((pair) => {
    const [key, value] = pair.split(":");
    obj[key] = value;
  });
  arr.push(obj);
});

console.log(arr);
// name:모찌빵,price:12000
// name:두바이쫀득쿠키,price:10000
