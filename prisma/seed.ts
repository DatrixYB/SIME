// prisma/seed.ts
import {
  PrismaClient,
  UserRole,
  PaymentType,
  OrderStatus,
  PaymentStatus,
  SaleStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🧼 Limpieza de datos previos
// 1. Ítems primero (dependen de Sale y PurchaseOrder)
await prisma.purchaseOrderItem.deleteMany();
await prisma.saleItem.deleteMany();

// 2. Órdenes y ventas
await prisma.purchaseOrder.deleteMany();
await prisma.sale.deleteMany();

// 3. Entidades relacionadas: pagos, productos y usuarios
await prisma.payment.deleteMany();       // Antes que usuarios
await prisma.product.deleteMany();       // Tiene supplier y category
await prisma.category.deleteMany();      // Product depende de Category

// 4. Clientes y proveedores
await prisma.client.deleteMany();        
await prisma.supplier.deleteMany();      // Ahora que no hay productos ni órdenes

// 5. Finalmente, usuarios
await prisma.user.deleteMany();

await prisma.$transaction([
  prisma.purchaseOrderItem.deleteMany(),
  prisma.saleItem.deleteMany(),
  prisma.purchaseOrder.deleteMany(),
  prisma.sale.deleteMany(),
  prisma.payment.deleteMany(),
  prisma.product.deleteMany(),
  prisma.category.deleteMany(),
  prisma.client.deleteMany(),
  prisma.supplier.deleteMany(),
  prisma.user.deleteMany(),
]);
const activeSuppliers = await prisma.supplier.findMany({
  where: {
    products: {
      some: {}, // Hay al menos un producto asociado
    },
  },
});
  // 👤 Usuarios
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@restaurante.com',
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  });

  const sellerPassword = await bcrypt.hash('seller123', 10);
  const sellers = await Promise.all(
    Array.from({ length: 2 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `seller${i + 1}@restaurante.com`,
          password: sellerPassword,
          role: UserRole.SELLER,
        },
      }),
    ),
  );

  const managerPassword = await bcrypt.hash('manager123', 10);
  const managers = await Promise.all(
    Array.from({ length: 2 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `manager${i + 1}@restaurante.com`,
          password: managerPassword,
          role: UserRole.MANAGER,
        },
      }),
    ),
  );

  const allUsers = [admin, ...sellers, ...managers];

  // 🚚 Proveedores
  const suppliers = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.supplier.create({
        data: {
          name: `Proveedor ${i + 1}`,
          email: `proveedor${i + 1}@empresa.com`,
          phone: `0800-77${i + 10}`,
          address: `Calle ${i + 1} #${100 + i}, Ciudad PYME`,
        },
      }),
    ),
  );
  // 🗂️ Categorías
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Entradas' } }),
    prisma.category.create({ data: { name: 'Platos principales' } }),
    prisma.category.create({ data: { name: 'Postres' } }),
    prisma.category.create({ data: { name: 'Bebidas' } }),
  ]);

  // 🍽️ Productos
  const products = await Promise.all(
    Array.from({ length: 7 }).map((_, i) => {
      const category = categories[i % categories.length];
      return prisma.product.create({
        data: {
          name: `Plato ${i + 1}`,
          price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          stock: Math.floor(Math.random() * 50 + 10),
          description: `Descripción del plato ${i + 1}`,
          image: `menu-${i + 1}.png`,
          categoryId: category.id,
          // categoryId: category.id,
          supplierId: suppliers[i % suppliers.length].id, 
        },
      });
    }),
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

  // 💰 Ventas con items y pagos
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
        status: Object.values(PaymentStatus)[i % 4],
      },
    });
    await prisma.sale.create({
      data: {
        userId: user.id,
        clientId: client.id,
        paymentId: payment.id,
        orden:i,
        total,
        status: i % 2 === 0 ? SaleStatus.PAID : SaleStatus.PENDING,
        items: {
          create: selectedItems,
        },
      },
    });
  }

  // 📦 Órdenes de compra (opcional)
  for (let i = 0; i < 5; i++) {
    const supplier = suppliers[i];
    const createdBy = admin;

    const itemsCount = Math.floor(Math.random() * 3) + 1;
    const selectedItems = Array.from({ length: itemsCount }).map(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      return {
        productId: product.id,
        quantity: Math.floor(Math.random() * 10) + 5,
        unitPrice: product.price,
      };
    });

    const orderTotal = selectedItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );

    await prisma.purchaseOrder.create({
      data: {
        supplierId: supplier.id,
        createdById: createdBy.id,
        status: OrderStatus.PENDING,
        total: orderTotal,
        items: {
          create: selectedItems,
        },
      },
    });
  }

  console.log(
    '🌱 Seed de SIME completado con proveedores, productos, usuarios y ventas.',
  );
}

main()
  .catch((e) => {
    console.error('❌ Error al hacer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



  // products.controller.ts
// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
// import { FileInterceptor } from '@nestjs/platform-express'
// import { diskStorage } from 'multer'
// import { extname } from 'path'

// @Controller('products')
// export class ProductsController {
//   @Post('upload-image')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: './public/products',
//         filename: (req, file, callback) => {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//           const ext = extname(file.originalname)
//           callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
//         },
//       }),
//       fileFilter: (req, file, cb) => {
//         if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//           return cb(new Error('Only image files are allowed!'), false)
//         }
//         cb(null, true)
//       },
//     }),
//   )
//   uploadImage(@UploadedFile() file: Express.Multer.File) {
//     return { filename: file.filename, path: `/products/${file.filename}` }
//   }
// }