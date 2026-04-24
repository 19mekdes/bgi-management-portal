import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';
import { attendanceReportValidator } from '../validators/report.validator';

const reportService = new ReportService();

export class ReportController {
  async getAttendanceReport(req: Request, res: Response) {
    const { error, value } = attendanceReportValidator.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const report = await reportService.generateAttendanceReport(value);
    res.json(report);
  }

  async exportAttendanceReport(req: Request, res: Response) {
    const { error, value } = attendanceReportValidator.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { format } = req.query;
    if (format === 'pdf') {
      const pdf = await reportService.exportAttendanceReportPDF(value);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.pdf');
      res.send(pdf);
    } else {
      const excel = await reportService.exportAttendanceReportExcel(value);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.xlsx');
      res.send(excel);
    }
  }

  async getInventoryReport(req: Request, res: Response) {
    const { startDate, endDate, productId } = req.query;
    const report = await reportService.generateInventoryReport({
      startDate: startDate as string,
      endDate: endDate as string,
      productId: productId ? Number(productId) : undefined,
    });
    res.json(report);
  }

  async exportInventoryReport(req: Request, res: Response) {
    const { startDate, endDate, productId, format } = req.query;
    const filters = {
      startDate: startDate as string,
      endDate: endDate as string,
      productId: productId ? Number(productId) : undefined,
    };
    if (format === 'pdf') {
      const pdf = await reportService.exportInventoryReportPDF(filters);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.pdf');
      res.send(pdf);
    } else {
      const excel = await reportService.exportInventoryReportExcel(filters);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=inventory_report.xlsx');
      res.send(excel);
    }
  }

  async getEmployeeReport(req: Request, res: Response) {
    const { startDate, endDate } = req.query;
    const report = await reportService.generateEmployeeReport({
      startDate: startDate as string,
      endDate: endDate as string,
    });
    res.json(report);
  }

  async exportEmployeeReport(req: Request, res: Response) {
    const { startDate, endDate, format } = req.query;
    const filters = {
      startDate: startDate as string,
      endDate: endDate as string,
    };
    if (format === 'pdf') {
      const pdf = await reportService.exportEmployeeReportPDF(filters);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=employee_report.pdf');
      res.send(pdf);
    } else {
      const excel = await reportService.exportEmployeeReportExcel(filters);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=employee_report.xlsx');
      res.send(excel);
    }
  }
}