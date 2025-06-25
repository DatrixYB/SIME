// src/sales/dto/create-sale.dto.ts
import { IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateSaleDto {
  @IsDateString()
  date: string;

  @IsNumber()
  total: number;

  @IsInt()
  clientId: number;

  @IsInt()
  userId: number;

  @IsInt()
  paymentId: number;
}
