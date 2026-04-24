import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { createProductValidator, updateProductValidator } from '../validators/product.validator';

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    const { page = 1, limit = 10, search, category, minStock } = req.query;
    const result = await productService.findAll({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      category: category as string,
      minStock: minStock ? Number(minStock) : undefined,
    });
    res.json(result);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await productService.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  }

  async create(req: Request, res: Response) {
    const { error, value } = createProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const product = await productService.create(value);
    res.status(201).json(product);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { error, value } = updateProductValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const product = await productService.update(id, value);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await productService.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  }

  async getLowStock(req: Request, res: Response) {
    const threshold = Number(req.query.threshold) || 5;
    const products = await productService.findLowStock(threshold);
    res.json(products);
  }
}