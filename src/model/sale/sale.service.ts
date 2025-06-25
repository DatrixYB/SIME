// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}
  Name = 'saleService';
  async create(dto: CreateSaleDto) {
    try {
      return await this.prisma.sale.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ${this.Name}'`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.sale.findMany({
        orderBy: { date: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el ${this.Name} findAll`,
      );
    }
  }

  async findOne(id: number) {
    const client = await this.prisma.sale.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(
        `Error en el ${this.Name} findOne:  no encontrado`,
      );
    }
    return client;
  }

  async update(id: number, dto: UpdateSaleDto) {
    try {
      const foundByid = await this.prisma.sale.findUnique({ where: { id } });
      console.log('foundByid', foundByid);
      if (dto && foundByid !== null) {
        return await this.prisma.sale.update({
          where: { id },
          data: dto,
        });
      }
    } catch (error) {
      throw new NotFoundException(
        `Error en el ${this.Name} update: saleo no update`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.sale.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Error el ${this.Name} remove: `);
    }
  }
}
