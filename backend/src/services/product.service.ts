import prisma from '../config/database';

export class ProductService {
  async findAll(params: { page: number; limit: number; search?: string; category?: string; minStock?: number }) {
    const { page, limit, search, category, minStock } = params;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) where.category = category;
    if (minStock !== undefined) where.quantity = { lte: minStock };
    const [data, total] = await Promise.all([
      prisma.product.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.product.count({ where }),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.product.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.product.update({ where: { id }, data });
  }

  async delete(id: number) {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async findLowStock(threshold: number) {
    return prisma.product.findMany({
      where: { quantity: { lte: threshold } },
      orderBy: { quantity: 'asc' },
    });
  }
}