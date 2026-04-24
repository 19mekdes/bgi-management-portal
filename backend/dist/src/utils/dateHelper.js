"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const formatDate = (date, pattern = 'yyyy-MM-dd') => {
    const d = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    return (0, date_fns_1.isValid)(d) ? (0, date_fns_1.format)(d, pattern) : '';
};
exports.formatDate = formatDate;
