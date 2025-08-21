import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSupplierDto) {
    // Verifica duplicados por nombre o email
    const existing = await this.prisma.supplier.findFirst({
      where: {
        OR: [{ name: dto.name }, { email: dto.email }],
      },
    });
    if (existing) {
      throw new ConflictException(
        'Ya existe un proveedor con ese nombre o email',
      );
    }

    return this.prisma.supplier.create({ data: dto });
  }
  async findAll() {
    const suppliers = await this.prisma.supplier.findMany({
      include: {
        orders: {
          include: {
            items: {
              select: { quantity: true },
            },
          },
        },
      },
    });
    // return suppliers

    const formatted = suppliers.map((supplier) => {
      const totalProducts = supplier.orders.reduce((sum, order) => {
        const orderTotal = order.items.reduce(
          (subSum, item) => subSum + item.quantity,
          0,
        );
        return sum + orderTotal;
      }, 0);
      return {
        id: supplier.id,
        name: supplier.name,
        contactName: supplier.contactName,
        address: supplier.address,
        phone: supplier.phone,
        email: supplier.email,
        totalProducts,
      };
    });
    return formatted;
  }
  async findAllProduct() {
    // Devuelve todos los proveedores con sus pedidos y productos
    const suppliers = this.prisma.supplier.findMany();
    const result = await this.prisma.purchaseOrder.findMany({
      include: {
        supplier: true,
        items: {
          select: {
            quantity: true,
          },
        },
      },
    });
    console.log(suppliers);
    const formatted = result.map((order) => {
      const totalProducts = order.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      return {
        orderId: order.id,
        id: order.supplierId,
        phone: order.supplier.phone,
        email: order.supplier.email,
        name: order.supplier.name,
        totalProducts,
      };
    });
    return formatted;
  }

  async findOne(id: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException('Proveedor no encontrado');
    return supplier;
  }

  async update(id: number, dto: UpdateSupplierDto) {
    await this.ensureExists(id);
    return this.prisma.supplier.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.supplier.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier) throw new NotFoundException('Proveedor no encontrado');
  }
  // src/suppliers/suppliers.service.ts
  async getTopSuppliers() {
    const limit = 3;
    const rawResult = await this.prisma.$queryRaw<
      { name: string; orders: bigint; amount: number }[]
    >`
    SELECT 
      s.name,
      COUNT(o.id) AS orders,
      SUM(o.total) AS amount
    FROM purchaseorder o
    JOIN supplier s ON s.id = o.supplierId
    GROUP BY s.name
    ORDER BY amount DESC
    LIMIT ${limit}
  `;
    const result = rawResult.map((r) => ({
      orders: Number(r.orders),
      name: String(r.name),
      total: Number(r.amount),
    }));
    console.error(result);
    return result;
  }
}
