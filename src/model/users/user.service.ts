import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un nuevo usuario después de verificar duplicidad y aplicar hash a la contraseña.
   */
  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, role,image ,name} = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, role,image,name },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new InternalServerErrorException(
        'Error interno al crear el usuario',
      );
    }
  }

  /**
   * Devuelve la lista de todos los usuarios con campos seguros.
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          image: true,
          name:true
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new InternalServerErrorException(
        'No se pudieron obtener los usuarios',
      );
    }
  }

  /**
   * Busca un usuario por ID.
   */
  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        name:true
      },
    });

    if (!user) {
      throw new BadRequestException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  /**
   * Actualiza parcialmente los datos de un usuario.
   */
  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException(`Usuario con ID ${id} no encontrado`);
    }

    const dataToUpdate: Partial<User> = { ...dto };

    if (dto.password) {
      if (dto.password.length < 6) {
        throw new BadRequestException(
          'La contraseña debe tener al menos 6 caracteres',
        );
      }
      dataToUpdate.password = await bcrypt.hash(dto.password, 10);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...safeUser } = updatedUser;
      return safeUser;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new InternalServerErrorException(
        'No se pudo actualizar el usuario',
      );
    }
  }

  /**
   * Elimina un usuario por ID.
   */
  async remove(id: number): Promise<{ id: number; message: string }> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new BadRequestException(`Usuario con ID ${id} no encontrado`);
    }

    try {
      const del = await this.prisma.user.delete({ where: { id } });
      return {
        id: del.id,
        message: `Usuario con ID ${id} eliminado correctamente`,
      };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}
