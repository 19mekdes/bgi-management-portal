"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
[4 / 8 / 2026, 2, 38, PM];
Sina: import prisma from '../config/database';
const date_fns_1 = require("date-fns");
const exceljs_1 = __importDefault(require("exceljs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
class ReportService {
    async generateAttendanceReport(filters) {
        const { startDate, endDate, employeeId } = filters;
        const where = {
            date: { gte: new Date(startDate), lte: new Date(endDate) },
        };
        if (employeeId)
            where.employeeId = parseInt(employeeId);
        const records = await database_1.default.attendance.findMany({
            where,
            include: { employee: true },
            orderBy: { date: 'asc' },
        });
        const summary = {
            totalPresent: records.filter(r => r.checkIn).length,
            totalAbsent: records.filter(r => !r.checkIn).length,
            rate: records.length ? (records.filter(r => r.checkIn).length / records.length) * 100 : 0,
        };
        const trend = records.reduce((acc, r) => {
            const dateStr = (0, date_fns_1.format)(r.date, 'yyyy-MM-dd');
            if (!acc[dateStr])
                acc[dateStr] = { date: dateStr, present: 0 };
            if (r.checkIn)
                acc[dateStr].present++;
            return acc;
        }, {});
        const details = records.map(r => ({
            id: r.id,
            date: r.date,
            employeeName: r.employee.name,
            checkIn: r.checkIn ? (0, date_fns_1.format)(r.checkIn, 'HH:mm') : null,
            checkOut: r.checkOut ? (0, date_fns_1.format)(r.checkOut, 'HH:mm') : null,
            status: r.checkIn ? (r.checkOut ? 'Completed' : 'Checked In') : 'Absent',
        }));
        return { summary, trend: Object.values(trend), details };
    }
    async exportAttendanceReportPDF(filters) {
        const report = await this.generateAttendanceReport(filters);
        const doc = new pdfkit_1.default();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => { });
        doc.fontSize(18).text('Attendance Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(Period, $, { filters, : .startDate }, to, $, { filters, : .endDate });
        doc.text(Total, Present, $, { report, : .summary.totalPresent });
        doc.text(Total, Absent, $, { report, : .summary.totalAbsent });
        doc.text(Attendance, Rate, $, { report, : .summary.rate.toFixed(2) } % );
        doc.moveDown();
        report.details.forEach(d => {
            doc.text($, { d, : .date }, $, { d, : .employeeName } - $, { d, : .status });
        });
        doc.end();
        return new Promise((resolve) => {
            doc.on('finish', () => resolve(Buffer.concat(buffers)));
        });
    }
    async exportAttendanceReportExcel(filters) {
        const report = await this.generateAttendanceReport(filters);
        const workbook = new exceljs_1.default.Workbook();
        const sheet = workbook.addWorksheet('Attendance Report');
        sheet.columns = [
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Employee', key: 'employeeName', width: 25 },
            { header: 'Check In', key: 'checkIn', width: 12 },
            { header: 'Check Out', key: 'checkOut', width: 12 },
            { header: 'Status', key: 'status', width: 15 },
        ];
        report.details.forEach(d => sheet.addRow(d));
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
    async generateInventoryReport(filters) {
        const products = await database_1.default.product.findMany();
        const summary = {
            totalProducts: products.length,
            totalStock: products.reduce((s, p) => s + p.quantity, 0),
            lowStockCount: products.filter(p => p.quantity <= 5).length,
            outOfStockCount: products.filter(p => p.quantity === 0).length,
        };
        const categoryBreakdown = products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + p.quantity;
            return acc;
        }, {});
        const topProducts = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 5);
        return {
            summary,
            categoryBreakdown: Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value })),
            topProducts: topProducts.map(p => ({ name: p.name, quantity: p.quantity })),
            products,
        };
    }
    exportInventoryReportPDF(filters) { /* similar to above */ return Buffer.from(''); }
    async exportInventoryReportExcel(filters) { /* similar */ return Buffer.from(''); }
    async generateEmployeeReport(filters) { /* implement */ return {}; }
    async exportEmployeeReportPDF(filters) { return Buffer.from(''); }
    async exportEmployeeReportExcel(filters) { return Buffer.from(''); }
}
exports.ReportService = ReportService;
4 / 8 / 2026;
