// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Injectable()
export class SaleItemService {
  constructor(private readonly prisma: PrismaService) {}
  Name = 'saleItemService';
  async create(dto: CreateSaleItemDto) {
    try {
      return await this.prisma.saleItem.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ${this.Name}'`);
    }
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
