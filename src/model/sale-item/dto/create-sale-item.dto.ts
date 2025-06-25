// src/sale-items/dto/create-sale-item.dto.ts
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateSaleItemDto {
  @IsInt()
  saleId: number;

  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}
