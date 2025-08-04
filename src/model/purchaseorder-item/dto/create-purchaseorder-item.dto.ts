// purchaseorder/dto/create-purchaseorder.dto.ts
import { IsPositive } from 'class-validator';
export class CreatePurchaseorderItemDto {
  @IsPositive()
  orderId: number;
  @IsPositive()
  productId: number;
  @IsPositive()
  quantity: number;
  @IsPositive()
  unitPrice: number;
}
