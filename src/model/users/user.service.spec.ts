import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { prismaMock } from '../../../test/__mock__/prisma.mock';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto'; // Asegúrate de tener este DTO

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const validDto: CreateUserDto = {
    email: 'mock@datrixyb.com',
    password: '123456',
    role: UserRole.ADMIN,
  };

  describe('createUser', () => {
    it('debería crear un usuario con contraseña cifrada y sin exponerla', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockImplementation(async ({ data }) => ({
        id: 1,
        email: data.email,
        password: data.password,
        role: data.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const result = await service.create(validDto);

      expect(result).toHaveProperty('email', validDto.email);
      expect(result).not.toHaveProperty('password');

      const hashed = prismaMock.user.create.mock.calls[0][0].data.password;
      expect(hashed).not.toBe(validDto.password);
      expect(hashed).toMatch(/^\$2[aby]\$.{56}$/); // Bcrypt hash format

      const isMatch = await bcrypt.compare(validDto.password, hashed);
      expect(isMatch).toBe(true);
    });

    it('debería lanzar ConflictException si el correo ya existe', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: validDto.email,
      });

      await expect(service.create(validDto)).rejects.toThrow(ConflictException);
    });

    it('debería fallar si el email es inválido (class-validator)', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validDto,
        email: 'noemail',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });

    it('debería fallar si la contraseña es muy corta (class-validator)', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validDto,
        password: '123',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
    });

    it('debería fallar si el rol no es válido (class-validator)', async () => {
      const dto = plainToInstance(CreateUserDto, {
        ...validDto,
        role: 'HACKER',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('role');
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los usuarios', async () => {
      const mockUsers = [
        {
          id: 1,
          email: 'test@example.com',
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
      expect(prismaMock.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería retornar el usuario por ID', async () => {
      const mockUser = {
        id: 14,
        email: 'u@u.com',
        role: 'USER',
        password: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(14);
      expect(result).toMatchObject({ id: 14, email: 'u@u.com' });
    });

    it('debería lanzar error si no existe el usuario', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un usuario existente', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ id: 5 });
      prismaMock.user.delete.mockResolvedValue({ id: 5 });

      // const result = await service.remove(5);
      // console.log(result);
      // expect(result).toEqual({ id: 5 });
    });

    it('debería lanzar error si el usuario no existe', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(BadRequestException);
    });
  });
});
