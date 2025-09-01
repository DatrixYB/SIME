// src/sales/dto/create-sale.dto.ts
import { OrderStatus, SaleStatus } from '@prisma/client';
import {IsEnum, IsNumber, IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsDateString()
  @IsOptional()
  date: string;

  @IsNumber()
  total: number;

  // @IsInt()
  @IsPositive()
  clientId: number;

  // @IsInt()
  @IsPositive()
  userId: number;

  // @IsInt()
    @IsPositive()
  paymentId: number;

  // @IsInt()
  @IsPositive()
  orden: number;

  @IsEnum(SaleStatus)
  status: SaleStatus
}
