import { Module } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { SaleItemController } from './sale-item.controller';

@Module({
  controllers: [SaleItemController],
  providers: [SaleItemService],
})
export class SaleItemModule {}
