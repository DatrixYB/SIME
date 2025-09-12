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
import { OnModuleInit } from '@nestjs/common'

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}
  async onModuleInit() {
    await this.ensureDefaultUser()
  }

  /**
   * Crea un nuevo usuario después de verificar duplicidad y aplicar hash a la contraseña.
  //  */
  // admin@sime.com · Pass: admin123
  async ensureDefaultUser(): Promise<void> {
  const defaultEmail = 'admin@sime.com'

  const existingUser = await this.prisma.user.findUnique({
    where: { email: defaultEmail },
  })

  if (existingUser) return

  const hashedPassword = await bcrypt.hash('admin123', 10)

  try {
    await this.prisma.user.create({
      data: {
        email: defaultEmail,
        password: hashedPassword,
        role: 'ADMIN', // Ajustá según tu enum o tipo
        name: 'Administrador',
        image: '', // Opcional
      },
    })
    console.log('✅ Usuario por defecto creado: admin@sime.com')
  } catch (error) {
    console.error('❌ Error al crear el usuario por defecto:', error)
  }
}
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
   * Busca un usuario por ID.
   */
  async findUser( dto): Promise<User> {

    console.log("email service", dto.email)
    // console.log("data",dto.password)
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        // name: dto.name,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        image: true,
        name: true,
        password: true
      },
    });

    if (!user) {
      console.log('Usuario no encontrado service');
      //  `Usuario con  ${dto.email}} no encontrado`;
      return null;
    }

    return user;
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
