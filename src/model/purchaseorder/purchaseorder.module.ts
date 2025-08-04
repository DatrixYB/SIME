import { Module } from '@nestjs/common';
import { PurchaseorderService } from './purchaseorder.service';
import { PurchaseorderController } from './purchaseorder.controller';

@Module({
  controllers: [PurchaseorderController],
  providers: [PurchaseorderService],
})
export class PurchaseorderModule {}
