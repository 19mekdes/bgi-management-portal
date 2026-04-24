import ExcelJS from 'exceljs';

export const generateExcel = async (data: any[], sheetName: string, columns: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);
  sheet.columns = columns;
  data.forEach(row => sheet.addRow(row));
  return workbook.xlsx.writeBuffer();
};