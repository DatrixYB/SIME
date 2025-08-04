// purchaseorder/dto/create-purchaseorder.dto.ts
import { OrderStatus } from '@prisma/client';
import { IsString, IsPositive } from 'class-validator';
export class CreatePurchaseorderDto {
  @IsPositive()
  total: number;

  @IsPositive()
  supplierId: number;
  @IsPositive()
  createdById: number;

  @IsString()
  status: OrderStatus;
}
