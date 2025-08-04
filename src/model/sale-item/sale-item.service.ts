// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';
import { CreateSaleOrderIDto } from './dto/create-saleorder-item.dto';
@Injectable()
export class SaleItemService {
  constructor(private readonly prisma: PrismaService) { }
  Name = 'saleItemService';
  async create(dto: CreateSaleItemDto) {
    try {


      const saleI = await this.prisma.$transaction(async (tx) => {
        const saleI = await tx.saleItem.create({ data: dto });

        await tx.product.update({
          where: { id: dto.productId },
          data: {
            stock: {
              decrement: dto.quantity,
            },
          },
        });
        return saleI;
      });
      return saleI;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ${this.Name}'`);
    }
  }
  async createSaleOrderItems(dto: CreateSaleOrderIDto) {
    const { saleId, items } = dto;

    return Promise.all(
      items.map(item => this.prisma.saleItem.create({
        data: {
          saleId: saleId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        },
      }))
    );
  }

  async findAll() {
    try {
      return await this.prisma.saleItem.findMany({
        orderBy: { saleId: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el ${this.Name} findAll`,
      );
    }
  }

  async findOne(id: number) {
    const client = await this.prisma.saleItem.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(
        `Error en el ${this.Name} findOne:  no encontrado`,
      );
    }
    return client;
  }

  async update(id: number, dto: UpdateSaleItemDto) {
    try {
      const foundByid = await this.prisma.saleItem.findUnique({
        where: { id },
      });
      console.log('foundByid', foundByid);
      if (dto && foundByid !== null) {
        return await this.prisma.saleItem.update({
          where: { id },
          data: dto,
        });
      }
    } catch (error) {
      throw new NotFoundException(
        `Error en el ${this.Name} update: saleItemo no update`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.saleItem.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Error el ${this.Name} remove: `);
    }
  }
}
