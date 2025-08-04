import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseorderItemDto } from './create-purchaseorder-item.dto';

export class UpdatePurchaseorderItemDto extends PartialType(CreatePurchaseorderItemDto) {}
