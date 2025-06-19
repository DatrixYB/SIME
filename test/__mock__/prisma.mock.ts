import { UserRole } from '@prisma/client';

export const prismaMock = {
  user: {
    // Simula que no existe el usuario por defecto (para test de creación exitosa)
    findUnique: jest.fn().mockResolvedValue(null),

    // Simula la creación de un usuario con valores por defecto
    create: jest.fn().mockImplementation(({ data }) => ({
      id: 1,
      email: data.email,
      password: data.password ?? 'mockedHashedPassword',
      role: data.role ?? UserRole.SELLER,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),

    // Simula búsqueda de todos los usuarios
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        email: 'admin@datrixyb.com',
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: 'user@datrixyb.com',
        role: UserRole.MANAGER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

    // Simula búsqueda por ID u otros parámetros
    findFirst: jest.fn(),
    findUniqueOrThrow: jest.fn(),

    // Simula eliminación de usuario
    delete: jest.fn().mockImplementation(({ where }) => ({
      id: where.id,
      email: 'deleted@datrixyb.com',
      role: UserRole.SELLER,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  },

  // Simulación de otras entidades opcionales
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },

  client: {
    create: jest.fn(),
    findMany: jest.fn(),
  },

  sale: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};
