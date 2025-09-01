import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PaymentService } from '../payment/payment.service';

@Module({
  controllers: [SaleController],
  providers: [SaleService,PaymentService],
})
export class SaleModule {}
