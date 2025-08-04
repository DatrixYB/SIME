import {
    IsPositive,
    IsArray,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
// import { CreateSaleItemDto } from './create-sale-item.dto';
import { CreateSaleItemsDto } from './create-sale-items.dto';

export class CreateSaleOrderIDto {
    @IsPositive()
    saleId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleItemsDto)
    items: CreateSaleItemsDto[];
}