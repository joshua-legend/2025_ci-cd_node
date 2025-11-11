const prompt = require("prompt-sync")();

while (true) {
  try {
    const year = prompt("년도 입력:");
    const month = prompt("월 입력:");
    const day = prompt("일 입력:");
    if (isNaN(year) || isNaN(month) || isNaN(day)) throw new Error("날짜 입력 오류");
    const today = new Date();
    const dday = new Date(`${year}-${month}-${day}`);
    const diff = dday.getTime() - today.getTime();
    const diffDay = diff / (1000 * 60 * 60 * 24);
    console.log(`D-Day:${diffDay}`);
  } catch (e) {
    console.log(e.message);
  }

  const key = prompt("다시 하겠습니까?[Y/N]");
  if (key.toLowerCase() == "n") break;
}

prompt("아무 키 누르면 시스템 종료");
