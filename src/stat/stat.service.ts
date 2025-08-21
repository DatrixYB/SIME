import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { PrismaService } from '../prisma/prisma.service';

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string; // nombre del ícono, lo resolvés en el frontend
  color: string;
}
@Injectable()
export class StatService {
  // generateStats(): StatCard[] | PromiseLike<StatCard[]> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private readonly prisma: PrismaService) {}

  async generateStats(): Promise<StatCard[]> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      sales,
      prevSales,
      products,
      newProducts,
      suppliers,
      newSuppliers,
      pendingOrders,
      yesterdayPending,
    ] = await Promise.all([
      this.prisma.sale.aggregate({
        _sum: { total: true },
        where: { date: { gte: startOfMonth } },
      }),
      this.prisma.sale.aggregate({
        _sum: { total: true },
        where: {
          date: {
            gte: new Date(
              startOfMonth.getFullYear(),
              startOfMonth.getMonth() - 1,
              1,
            ),
            lt: startOfMonth,
          },
        },
      }),
      this.prisma.product.count(),
      this.prisma.product.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prisma.supplier.count(),
      this.prisma.supplier.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prisma.purchaseOrder.count({ where: { status: 'PENDING' } }),
      this.prisma.purchaseOrder.count({
        where: {
          status: 'PENDING',
          // Replace 'orderDate' with the actual date field name from your PurchaseOrder model
          date: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        },
      }),
    ]);

    const salesChange =
      (((sales._sum.total ?? 0) - (prevSales._sum.total ?? 0)) /
        (prevSales._sum.total ?? 1)) *
      100;

    return [
      {
        title: 'Ventas del Mes',
        value: `$${(sales._sum.total ?? 0).toFixed(2)}`,
        change: `${salesChange.toFixed(1)}%`,
        icon: 'DollarSign',
        color: 'text-green-600',
      },
      {
        title: 'Productos',
        value: products.toLocaleString(),
        change: `+${newProducts} nuevos`,
        icon: 'Package',
        color: 'text-blue-600',
      },
      {
        title: 'Proveedores',
        value: suppliers.toString(),
        change: `+${newSuppliers} este mes`,
        icon: 'Users',
        color: 'text-purple-600',
      },
      {
        title: 'Órdenes Pendientes',
        value: pendingOrders.toString(),
        change: `${pendingOrders - yesterdayPending >= 0 ? '+' : ''}${pendingOrders - yesterdayPending} desde ayer`,
        icon: 'ShoppingCart',
        color: 'text-orange-600',
      },
    ];
  }

  create(createStatDto: CreateStatDto) {
    return 'This action adds a new stat';
  }

  findAll() {
    return `This action returns all stat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stat`;
  }

  update(id: number, updateStatDto: UpdateStatDto) {
    return `This action updates a #${id} stat`;
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }
}
