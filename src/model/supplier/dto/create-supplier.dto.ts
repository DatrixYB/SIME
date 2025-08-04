import { IsString, IsOptional, IsEmail, IsPositive } from 'class-validator';

export class CreateSupplierDto {
  @IsPositive()
  @IsOptional()
  id: number;
  @IsString()
  name: string;
  @IsString()
  contactName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}