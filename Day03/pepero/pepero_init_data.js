const exceljs = require("exceljs");
const workbook = new exceljs.Workbook();
const peperoWorkBook = workbook.addWorksheet("빼빼로 과자 리스트");
peperoWorkBook.columns = [
  { header: "이름", key: "name" },
  { header: "가격", key: "price" },
];
peperoWorkBook.addRows([
  { name: "초코빼빼로", price: 1000 },
  { name: "아몬드빼빼로", price: 1500 },
  { name: "초코필드빼빼로", price: 1500 },
  { name: "화이트쿠키빼빼로", price: 1500 },
]);
workbook.xlsx.writeFile("pepero.xlsx");
