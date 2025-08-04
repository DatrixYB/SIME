// src/products/dto/create-product.dto.ts
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  minStock: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsInt()
  @IsPositive()
  categoryId: number;
  @IsInt()
  @IsPositive()
  supplierId: number;
}
