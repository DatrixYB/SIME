// dto/purchase-item.dto.ts
import { IsPositive } from 'class-validator';

export class PurchaseItemDto {
  @IsPositive()
  productId: number;

  @IsPositive()
  quantity: number;

  @IsPositive()
  unitPrice: number;
}