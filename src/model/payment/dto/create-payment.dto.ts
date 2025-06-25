// src/payments/dto/create-payment.dto.ts
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { PaymentType } from '@prisma/client';
export class CreatePaymentDto {
  @IsEnum(PaymentType)
  method: PaymentType;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsDateString()
  paidAt: string;

  @IsNumber()
  amount: number;
}
