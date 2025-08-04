import { CreatePurchaseorderDto } from './dto/create-purchaseorder.dto';
import { UpdatePurchaseorderDto } from './dto/update-purchaseorder.dto';
import {
  Injectable,
  NotFoundException,
  // ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseorderService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPurchaseorderDto: CreatePurchaseorderDto) {
    // Check if the purchase order already exists
    try {
      return this.prisma.purchaseOrder.create({ data: createPurchaseorderDto });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al crear el purchase order: ${error.message}`,
      );
    }
  }
  private async ensureExists(id: number) {
    const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });
    if (!purchaseOrder) throw new NotFoundException('Order not found');
    return purchaseOrder;
  }

  async findAll() {
    return await this.prisma.purchaseOrder.findMany();
  }

  async findOne(id: number) {
    return await this.ensureExists(id);
  }

  async update(id: number, updatePurchaseorderDto: UpdatePurchaseorderDto) {
    const exist = await this.ensureExists(id);
    if (!exist) {
      throw new NotFoundException('Purchase order not found');
    }
    return this.prisma.purchaseOrder.update({
      where: { id },
      data: updatePurchaseorderDto,
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.purchaseOrder.delete({ where: { id } });
  }
}
