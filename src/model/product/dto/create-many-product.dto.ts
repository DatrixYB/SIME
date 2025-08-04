// create-many-products.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested, ArrayNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreateManyProductsDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
