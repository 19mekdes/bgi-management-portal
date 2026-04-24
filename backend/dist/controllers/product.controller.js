"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const product_validator_1 = require("../validators/product.validator");
const productService = new product_service_1.ProductService();
class ProductController {
    async getAll(req, res) {
        const { page = 1, limit = 10, search, category, minStock } = req.query;
        const result = await productService.findAll({
            page: Number(page),
            limit: Number(limit),
            search: search,
            category: category,
            minStock: minStock ? Number(minStock) : undefined,
        });
        res.json(result);
    }
    async getById(req, res) {
        const id = Number(req.params.id);
        const product = await productService.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    async create(req, res) {
        const { error, value } = product_validator_1.createProductValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const product = await productService.create(value);
        res.status(201).json(product);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const { error, value } = product_validator_1.updateProductValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const product = await productService.update(id, value);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        const deleted = await productService.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send();
    }
    async getLowStock(req, res) {
        const threshold = Number(req.query.threshold) || 5;
        const products = await productService.findLowStock(threshold);
        res.json(products);
    }
}
exports.ProductController = ProductController;
