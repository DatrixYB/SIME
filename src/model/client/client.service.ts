// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto) {
    console.log('Creating client with data:', dto);
    try {
      return await this.prisma.client.create({ data: dto });
    } catch (error) {
      console.log('Error creating client:', error);
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }

  async findAll() {
    try {
      return await this.prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudieron listar los clientes',
      );
    }
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return client;
  }
    async findLast() {
    const client = await this.prisma.client.findFirst({
  orderBy: { createdAt: 'desc' },
});
    if (!client) {
      return {'message':"not found client",
        'notfound':true
      }
      throw new NotFoundException('Cliente no encontrado');
    }
    return client;
  }

  async update(id: number, dto: UpdateClientDto) {
    try {
      return await this.prisma.client.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el cliente');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.client.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Cliente no encontrado o ya fue eliminado');
    }
  }
}
