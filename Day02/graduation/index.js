const prompt = require("prompt-sync")();

const today = new Date();
const dday = new Date("2026-01-27");
const diff = dday.getTime() - today.getTime();
const diffDay = diff / (1000 * 60 * 60 * 24);
console.log(`🎉D-Day:${Math.floor(diffDay)}일 남음🎉`);
prompt("프로그램 종료를 원하시면 아무 키를 눌러주세요.");
