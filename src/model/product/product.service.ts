// client.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateManyProductsDto } from './dto/create-many-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  Name = 'ProductService';
  async create(dto: CreateProductDto) {
    try {
      return await this.prisma.product.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el ${error.message} '`);
    }


}

  async createMany(dto: CreateManyProductsDto) {
    try {
       await this.prisma.product.createMany({
        data: dto.products,
      });
      const created = await this.prisma.product.findMany({
  where: {
    name: {
      in: dto.products.map(p => p.name),
    },
    supplierId: { in: dto.products.map(p => p.supplierId) },        // asumiendo que viene en el DTO
    categoryId: { in: dto.products.map(p => p.categoryId) },        // asumiendo que viene en el DTO

  },
  select: { id: true },
});
return created.map(p => p.id);

    } catch (error) {
      throw new InternalServerErrorException(
        `Error al crear múltiples productos: ${error.message}`,
      );
    }
  }

async findAll() {
    try {
      const products = await this.prisma.product.findMany({
        include: {category: true,
          supplier: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return products.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  stock: product.stock,
  minStock: product.minStock,
  image: product.image,
  category: product.category.name, // ✅ ¡Aquí está el nombre directamente!
  supplier: product.supplier.name
}));

    } catch (error) {
      throw new InternalServerErrorException(
        `Error en el ${this.Name} findAll`,
      );
    }
  }

  async findOne(id: number) {
    const client = await this.prisma.product.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(
        `Error en el ${this.Name} findOne:  no encontrado`,
      );
    }
    return client;
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      const foundByid = await this.prisma.product.findUnique({ where: { id } });
      console.log('foundByid', foundByid);
      if (dto && foundByid !== null) {
        return await this.prisma.product.update({
          where: { id },
          data: dto,
        });
      }
    } catch (error) {
      throw new NotFoundException(
        `Error en el ${this.Name} update: producto no update`,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Error el ${this.Name} remove: `);
    }
  }
}

// import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
// import { Response } from 'express';
// import * as path from 'path';
// import * as fs from 'fs';

// @Controller('product-images')
// export class ImageController {
//   @Get(':filename')
//   async getProductImage(@Param('filename') filename: string, @Res() res: Response) {
//     const imagePath = path.join(__dirname, '..', '..', 'uploads', 'products', filename);
//     if (!fs.existsSync(imagePath)) {
//       return res.status(404).send('Imagen no encontrada');
//     }
//     res.sendFile(imagePath);
//   }
// }