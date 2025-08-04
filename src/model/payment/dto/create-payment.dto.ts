// src/payments/dto/create-payment.dto.ts
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { PaymentStatus, PaymentType } from '@prisma/client';
export class CreatePaymentDto {
  @IsEnum(PaymentType)
  method: PaymentType;
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsDateString()
  @IsOptional()
  paidAt: string;

  @IsNumber()
  amount: number;
}
