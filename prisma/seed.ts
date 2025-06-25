// prisma/seed.ts
import { PrismaClient, UserRole, PaymentType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🧹 Eliminar datos existentes
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // 👤 Usuarios
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@restaurante.com',
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });
  const passwordSellerHash = await bcrypt.hash('seller123', 10);
  const sellers = await Promise.all(
    Array.from({ length: 2 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `seller${i + 1}@restaurante.com`,
          password: passwordSellerHash,
          role: UserRole.SELLER,
        },
      }),
    ),
  );
  const passwordManagerHash = await bcrypt.hash('manager123', 10);
  const managers = await Promise.all(
    Array.from({ length: 2 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `manager${i + 1}@restaurante.com`,
          password: passwordManagerHash,
          role: UserRole.MANAGER,
        },
      }),
    ),
  );

  const allUsers = [admin, ...sellers, ...managers];

  // 🍽️ Productos
  const products = await Promise.all(
    Array.from({ length: 100 }).map((_, i) =>
      prisma.product.create({
        data: {
          name: `Plato ${i + 1}`,
          price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          stock: Math.floor(Math.random() * 50 + 10),
          description: `Descripción del plato ${i + 1}`,
        },
      }),
    ),
  );

  // 👥 Clientes
  const clients = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.client.create({
        data: {
          name: `Cliente ${i + 1}`,
          email: `cliente${i + 1}@demo.com`,
          phone: `555-00${i + 1}`,
        },
      }),
    ),
  );

  // 💰 Ventas
  for (let i = 0; i < 20; i++) {
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const itemsCount = Math.floor(Math.random() * 5) + 1;
    const selectedItems = Array.from({ length: itemsCount }).map(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      return {
        productId: product.id,
        quantity,
        price: product.price,
      };
    });

    const total = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const payment = await prisma.payment.create({
      data: {
        method: Object.values(PaymentType)[i % 4],
        reference: `REF-${i + 1000}`,
        amount: total,
      },
    });

    await prisma.sale.create({
      data: {
        userId: user.id,
        clientId: client.id,
        paymentId: payment.id,
        total,
        items: {
          create: selectedItems,
        },
      },
    });
  }

  console.log('🌱 Seed de restaurante completado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error al hacer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
