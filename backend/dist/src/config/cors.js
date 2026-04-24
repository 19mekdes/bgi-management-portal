"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const _1 = require(".");
exports.corsOptions = {
    origin: _1.config.frontendUrl,
    credentials: true,
    optionsSuccessStatus: 200,
};
