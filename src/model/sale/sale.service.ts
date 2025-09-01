// client.service.ts

import { PaymentStatus, Prisma, SaleStatus } from '@prisma/client';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

import {
  Injectable,
  NotFoundException,
  // ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from '../payment/payment.service';
// import { InternalSererErrorException } from '@nestjs/common';
// import { format } from 'date-fns';
// import { es } from 'date-fns/locale';
@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService,private readonly payment:PaymentService) {}

  async create(createSaleorderDto: CreateSaleDto) {
    try {
      // Map DTO to Prisma input type

      const { clientId, userId, paymentId, ...rest } = createSaleorderDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new BadRequestException(`Usuario con ID ${userId} no encontrado`);
      }
     const paid =  await this.payment.findOne(paymentId)
     let status = ""
     if (paid.status === PaymentStatus.COMPLETED){
      status = SaleStatus.PAID
     }else{
      status = SaleStatus.PENDING
     }
      const saleData: any = {
        ...rest,
        client: clientId ? { connect: { id: clientId } } : undefined,
        user: userId ? { connect: { id: userId } } : undefined,
        payment: paymentId ? { connect: { id: paymentId } } : undefined,
        status: status
        // Add other relations if needed, e.g. items
      };

      return await this.prisma.sale.create({ data: saleData });
    } catch (error) {
      console.error('Error creating sale order:', error);
      throw new InternalServerErrorException(
        `Error al crear el Sale order: ${error.message}`,
      );
    }
  }
  private async ensureExists(id: number) {
    const saleOrder = await this.prisma.sale.findUnique({
      where: { id },
    });
    if (!saleOrder) throw new NotFoundException('Order not found');
    return saleOrder;
  }

  async findAll() {
    return await this.prisma.sale.findMany();
  }

  async findOne(id: number) {
    const saleOrder = await this.prisma.sale.findUnique({
      where: { id },

      include: {
        // client: true,
        // user: true,
        // payment: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!saleOrder) throw new NotFoundException('Order not found');

    // return saleOrder
    return {
      id: saleOrder.id,
      product: saleOrder.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      // quantity: ,
      // totalItems: saleOrder.items.reduce((sum, item) => sum + item.quantity, 0),
      total: saleOrder.total,
      // paymentMethod: saleOrder.payment.method,
      // statusPayment: saleOrder.payment.status,
      statusSale: saleOrder.status,
    };
  }

  async update(id: number, updatePurchaseorderDto: UpdateSaleDto) {
    const exist = await this.ensureExists(id);
    if (!exist) {
      throw new NotFoundException('Purchase order not found');
    }
    const { clientId, userId, paymentId, ...rest } = updatePurchaseorderDto;
    const updateData: any = {
      ...rest,
      ...(clientId !== undefined && { client: { connect: { id: clientId } } }),
      ...(userId !== undefined && { user: { connect: { id: userId } } }),
      ...(paymentId !== undefined && {
        payment: { connect: { id: paymentId } },
      }),
    };
    return this.prisma.sale.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.sale.delete({ where: { id } });
  }

  async findAllWithRelations() {
    try {
      const sales = await this.prisma.sale.findMany({
        where: {
          // payment: { status: 'COMPLETED' },
          // status: { not: 'PAID' }, // evitamos actualizar redundante
        },
        include: {
          client: true,
          payment: true,
          items: true,
        },
        orderBy: { date: 'desc' },
      });

      return sales.map((sale) => ({
        id: sale.id,
        client: sale.client.name,
        date: sale.date,
        totalItems: sale.items.reduce((sum, item) => sum + item.quantity, 0),
        total: sale.total,
        paymentMethod: sale.payment.method,
        statusPayment: sale.payment.status,
        statusSale: sale.status, // reflejamos cambio en respuesta
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el ${error} findAllWithRelations`,
      );
    }
  }

  async findLastFiveSales() {
    try {
      const sales = await this.prisma.sale.findMany({
        include: {
          client: true,
          payment: true,
          items: true,
        },
        orderBy: { date: 'desc' },
        take: 5,
      });

      return sales.map((sale) => ({
        id: sale.id.toString().padStart(3, '0'), // Ej: "004"
        customer: sale.client.name,
        amount: `$${sale.total.toFixed(2)}`, // Ej: "$450.00"
        status:
          sale.payment.status === 'COMPLETED'
            ? 'Completada'
            : sale.payment.status,
        // date: format(new Date(sale.date), 'yyyy-MM-dd', { locale: es }), // Ej: "2024-01-14"
        date: sale.date.toISOString().split('T')[0], // Ej: "2024-01-14"
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en findLastFiveSales: ${error}`,
      );
    }
  }
  // src/sales/sales.service.ts
  async getMonthlySalesData() {
    const rawResult = await this.prisma.$queryRaw<
      { mes: number; sales: number; orders: bigint }[]
    >(
      Prisma.sql`
     SELECT 
       MONTH(oi.date) as mes,
       SUM(oi.total) AS sales,
       COUNT(*) AS orders
     FROM pos_pyme.sale oi
   `,
    );
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const result = rawResult.map((r) => ({
      orders: Number(r.orders),
      sales: Number(r.sales),
      month: monthNames[r.mes - 1],
    }));
    console.log(result);
    return result;
  }
}
