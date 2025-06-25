// prisma/seed.ts
import { PrismaClient, PaymentType, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'hashed-password', // reemplazá por un hash real
      role: UserRole.ADMIN,
    },
  });

  const client = await prisma.client.create({
    data: {
      name: 'Cliente Demo',
      email: 'cliente@example.com',
      phone: '123456789',
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Producto 1',
      price: 100,
      stock: 50,
      description: 'Primer producto de prueba',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Producto 2',
      price: 200,
      stock: 30,
    },
  });

  const payment = await prisma.payment.create({
    data: {
      method: PaymentType.CARD,
      reference: 'TX123456',
      amount: 300,
    },
  });

  const sale = await prisma.sale.create({
    data: {
      clientId: client.id,
      userId: adminUser.id,
      paymentId: payment.id,
      total: 300,
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            price: product1.price,
          },
          {
            productId: product2.id,
            quantity: 1,
            price: product2.price,
          },
        ],
      },
    },
  });

  console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
