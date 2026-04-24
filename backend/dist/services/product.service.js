"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = __importDefault(require("../config/database"));
class ProductService {
    async findAll(params) {
        const { page, limit, search, category, minStock } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category)
            where.category = category;
        if (minStock !== undefined)
            where.quantity = { lte: minStock };
        const [data, total] = await Promise.all([
            database_1.default.product.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
            database_1.default.product.count({ where }),
        ]);
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    }
    async findById(id) {
        return database_1.default.product.findUnique({ where: { id } });
    }
    async create(data) {
        return database_1.default.product.create({ data });
    }
    async update(id, data) {
        return database_1.default.product.update({ where: { id }, data });
    }
    async delete(id) {
        try {
            await database_1.default.product.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
    async findLowStock(threshold) {
        return database_1.default.product.findMany({
            where: { quantity: { lte: threshold } },
            orderBy: { quantity: 'asc' },
        });
    }
}
exports.ProductService = ProductService;
