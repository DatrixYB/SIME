import {
  IsPositive,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseorderItemDto } from './create-purchaseorder-item.dto';
import { PurchaseItemDto } from './create-puchase-item.dto';

export class CreatePurchaseOrderIDto {
  @IsPositive()
  orderId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
}