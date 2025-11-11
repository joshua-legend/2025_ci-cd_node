const ExcelJS = require("exceljs");
const getPepero = async () => {
  const Workbook = new ExcelJS.Workbook();
  await Workbook.xlsx.readFile("pepero.xlsx");
  const sheet = Workbook.worksheets[0];
  const arr = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber == 1) return;
    const [_, name, price] = row.values;
    arr.push({ name, price });
  });
  return arr;
};
module.exports = getPepero;
