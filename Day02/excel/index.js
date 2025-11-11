const exceljs = require("exceljs");

const workbook = new exceljs.Workbook();
const peperoWorkBook = workbook.addWorksheet("빼빼로 과자 리스트");
peperoWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "맛", key: "flavor" },
  { header: "칼로리", key: "kcal" },
];

peperoWorkBook.addRow({ name: "누드", flavor: "부드러운 초코", kcal: "300" });
peperoWorkBook.addRow({ name: "오리지널", flavor: "뻑뻑한 초코맛", kcal: "200" });

const icecreamWorkBook = workbook.addWorksheet("아이스크림 리스트");
icecreamWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "맛", key: "flavor" },
  { header: "칼로리", key: "kcal" },
];

icecreamWorkBook.addRow({ name: "월드콘", flavor: "바닐라", kcal: "350" });
icecreamWorkBook.addRow({ name: "빠삐코", flavor: "펭귄맛", kcal: "150" });

workbook.xlsx.writeFile("pepero.xlsx");
