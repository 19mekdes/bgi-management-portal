"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.createProductValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    category: joi_1.default.string().required(),
    quantity: joi_1.default.number().integer().min(0).required(),
    productionDate: joi_1.default.date().iso().required(),
});
exports.updateProductValidator = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    category: joi_1.default.string(),
    quantity: joi_1.default.number().integer().min(0),
    productionDate: joi_1.default.date().iso(),
});
