import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './model/users/user.module';
import { ClientModule } from './model/client/client.module';
import { ProductModule } from './model/product/product.module';
import { SaleModule } from './model/sale/sale.module';
import { SaleItemModule } from './model/sale-item/sale-item.module';
import { PaymentModule } from './model/payment/payment.module';
import { SupplierModule } from './model/supplier/supplier.module';
import { CategoryModule } from './model/category/category.module';
import { PurchaseorderModule } from './model/purchaseorder/purchaseorder.module';
import { PurchaseorderItemModule } from './model/purchaseorder-item/purchaseorder-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    PrismaModule,
    ClientModule,
    ProductModule,
    SaleModule,
    SaleItemModule,
    PaymentModule,
    SupplierModule,
    CategoryModule,
    PurchaseorderModule,
    PurchaseorderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
