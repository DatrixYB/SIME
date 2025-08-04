import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseorderItemDto } from './dto/create-purchaseorder-item.dto';
import { UpdatePurchaseorderItemDto } from './dto/update-purchaseorder-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseOrderIDto } from './dto/create-puchaseorderi.dto';

@Injectable()
export class PurchaseorderItemService {
  constructor(private readonly prisma: PrismaService) {}
  // Implement the methods for creating, finding, updating, and removing purchase order items
  create(createPurchaseorderItemDto: CreatePurchaseorderItemDto) {
    try {
      return this.prisma.purchaseOrderItem.create({
        data: createPurchaseorderItemDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al crear el purchase order items: ${error.message}`,
      );
    }
  }
  async createPurchaseOrderItems(dto: CreatePurchaseOrderIDto) {
  const { orderId, items } = dto;

  return Promise.all(
    items.map(item => this.prisma.purchaseOrderItem.create({
      data: {
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      },
    }))
  );
}
async createPurchaseOrderItems4(dto: CreatePurchaseOrderIDto) {
  const { orderId, items } = dto;

  return Promise.all(
    items.map(item => this.prisma.purchaseOrderItem.create({
      data: {
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      },
    }))
  );
}
  async createPurchaseOrderItems2(dto:  CreatePurchaseOrderIDto
) {
  const items = dto.items.map(( s,index) => ({
    orderId: dto.orderId,
    productId:dto.items[index].productId,
    quantity: dto.items[index].quantity,
    unitprice: dto.items[index].unitPrice,
  }));

  // await this.prisma.purchaseOrderItem.createMany({
  //   items,
  // });
return "creado"
  // return { count: items.length }; // opcional: podés devolver los items si querés
}
  private async ensureExists(id: number) {
    const purchaseOrderItem = await this.prisma.purchaseOrderItem.findUnique({
      where: { id },
    });
    if (!purchaseOrderItem) throw new NotFoundException('Order not found');
    return purchaseOrderItem;
  }
  async findAll() {
    return await this.prisma.purchaseOrderItem.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.purchaseOrderItem.findMany({
      where: { id },
      include: { order: true },
    });
    return data || null;
  }
  async findByOrder(id: number) {
    const items = await this.prisma.purchaseOrderItem.findMany({
      where: {
        orderId: id,
      },
      include: {
        product: true,
      },
    });
    console.log('items', items);
    return items || null;
  }
  async update(
    id: number,
    updatePurchaseorderItemDto: UpdatePurchaseorderItemDto,
  ) {
    await this.ensureExists(id);
    try {
      return this.prisma.purchaseOrderItem.update({
        where: { id },
        data: updatePurchaseorderItemDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar el purchase order item: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    await this.ensureExists(id);
    try {
      return await this.prisma.purchaseOrderItem.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(
        `Error el  remove purchaseorderitem: ${error.message}`,
      );
    }
  }
}
