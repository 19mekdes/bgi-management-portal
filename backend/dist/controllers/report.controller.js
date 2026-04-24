"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("../services/report.service");
const report_validator_1 = require("../validators/report.validator");
const reportService = new report_service_1.ReportService();
class ReportController {
    async getAttendanceReport(req, res) {
        const { error, value } = report_validator_1.attendanceReportValidator.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const report = await reportService.generateAttendanceReport(value);
        res.json(report);
    }
    async exportAttendanceReport(req, res) {
        const { error, value } = report_validator_1.attendanceReportValidator.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { format } = req.query;
        if (format === 'pdf') {
            const pdf = await reportService.exportAttendanceReportPDF(value);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.pdf');
            res.send(pdf);
        }
        else {
            const excel = await reportService.exportAttendanceReportExcel(value);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.xlsx');
            res.send(excel);
        }
    }
    async getInventoryReport(req, res) {
        const { startDate, endDate, productId } = req.query;
        const report = await reportService.generateInventoryReport({
            startDate: startDate,
            endDate: endDate,
            productId: productId ? Number(productId) : undefined,
        });
        res.json(report);
    }
    async exportInventoryReport(req, res) {
        const { startDate, endDate, productId, format } = req.query;
        const filters = {
            startDate: startDate,
            endDate: endDate,
            productId: productId ? Number(productId) : undefined,
        };
        if (format === 'pdf') {
            const pdf = await reportService.exportInventoryReportPDF(filters);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.pdf');
            res.send(pdf);
        }
        else {
            const excel = await reportService.exportInventoryReportExcel(filters);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.xlsx');
            res.send(excel);
        }
    }
    async getEmployeeReport(req, res) {
        const { startDate, endDate } = req.query;
        const report = await reportService.generateEmployeeReport({
            startDate: startDate,
            endDate: endDate,
        });
        res.json(report);
    }
    async exportEmployeeReport(req, res) {
        const { startDate, endDate, format } = req.query;
        const filters = {
            startDate: startDate,
            endDate: endDate,
        };
        if (format === 'pdf') {
            const pdf = await reportService.exportEmployeeReportPDF(filters);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=employee_report.pdf');
            res.send(pdf);
        }
        else {
            const excel = await reportService.exportEmployeeReportExcel(filters);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=employee_report.xlsx');
            res.send(excel);
        }
    }
}
exports.ReportController = ReportController;
