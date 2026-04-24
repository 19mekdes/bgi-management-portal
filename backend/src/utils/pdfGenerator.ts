import PDFDocument from 'pdfkit';

export const generatePDF = (title: string, content: string): Promise<Buffer> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.fontSize(18).text(title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(content);
    doc.end();
  });
};