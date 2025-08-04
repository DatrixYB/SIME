import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createCategoryDto: CreateCategoryDto) {
   try {
  const existingCategory = await this.prisma.category.findUnique({
    where: {
      name: createCategoryDto.name, // Asumiendo que 'nombre' es único
    },
  });
  if( existingCategory) {
//  console.log('existingCategory', existingCategory);
  throw new BadRequestException('La categoría ya existe');
  
}
  

  return await this.prisma.category.create({ data: createCategoryDto });
} catch (error) {
  if (error instanceof BadRequestException) {
    throw error;
  }

  // Otro tipo de errores (por ejemplo, DB) se manejan como internos
  throw new InternalServerErrorException('Error al crear categoría');

}
  }

  async findAll() {
       try {
      return await this.prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'No se pudieron listar los clientes',
      );
    }
  }

async findOne(id: number) {
  try {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new BadRequestException(`No se encontró la categoría con ID ${id}`);
    }

    return category;
  } catch (error) {
    throw new InternalServerErrorException('Error al buscar la categoría');
  }
}

async update(id: number, updateCategoryDto: UpdateCategoryDto) {
  try {
    const existing = await this.prisma.category.findUnique({ where: { id } });

    if (!existing) {
      throw new BadRequestException(`No existe categoría con ID ${id}`);
    }

    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  } catch (error) {
    throw new InternalServerErrorException('Error al actualizar la categoría');
  }
}

async remove(id: number) {
  try {
    const existing = await this.prisma.category.findUnique({ where: { id } });

    if (!existing) {
      throw new BadRequestException(`No existe categoría con ID ${id}`);
    }

    return await this.prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar la categoría');
  }
}
}
