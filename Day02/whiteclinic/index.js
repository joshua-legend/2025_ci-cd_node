const ExcelJS = require("exceljs");

const readExcel = async () => {
  const Workbook = new ExcelJS.Workbook();
  await Workbook.xlsx.readFile("data.xlsx");
  const sheet = Workbook.worksheets[0];
  let row = 13;
  while (true) {
    const newRow = sheet.getRow(row);
    console.log(newRow.values[3].richText[1].text);
    row = row + 10;
    if (row > 154) break;
  }
};

readExcel();
