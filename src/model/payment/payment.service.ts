// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatus, PaymentType } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  Name = 'paymentService';
  async create(dto: CreatePaymentDto) {
    try {
if (dto.method === PaymentType.CASH){
dto.status = PaymentStatus.COMPLETED
}

      return await this.prisma.payment.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ${this.Name}'`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.payment.findMany({
        orderBy: { paidAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el ${this.Name} findAll`,
      );
    }
  }

  async findOne(id: number) {
    const client = await this.prisma.payment.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(
        `Error en el ${this.Name} findOne:  no encontrado`,
      );
    }
    return client;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    try {
      const foundByid = await this.prisma.payment.findUnique({ where: { id } });
      console.log('foundByid', foundByid);
      if (dto && foundByid !== null) {
        return await this.prisma.payment.update({
          where: { id },
          data: dto,
        });
      }
    } catch (error) {
      throw new NotFoundException(
        `Error en el ${this.Name} update: paymento no update`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.payment.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Error el ${this.Name} remove: `);
    }
  }
}
