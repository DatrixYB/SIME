import { Module } from '@nestjs/common';
import { PurchaseorderItemService } from './purchaseorder-item.service';
import { PurchaseorderItemController } from './purchaseorder-item.controller';

@Module({
  controllers: [PurchaseorderItemController],
  providers: [PurchaseorderItemService],
})
export class PurchaseorderItemModule {}
