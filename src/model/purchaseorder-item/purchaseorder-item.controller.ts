import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseorderItemService } from './purchaseorder-item.service';
import { CreatePurchaseorderItemDto } from './dto/create-purchaseorder-item.dto';
import { UpdatePurchaseorderItemDto } from './dto/update-purchaseorder-item.dto';
import { CreatePurchaseOrderIDto } from './dto/create-puchaseorderi.dto';

@Controller('purchaseorder-item')
export class PurchaseorderItemController {
  constructor(
    private readonly purchaseorderItemService: PurchaseorderItemService,
  ) {}

  @Post()
  create(@Body() createPurchaseorderItemDto: CreatePurchaseorderItemDto) {
    return this.purchaseorderItemService.create(createPurchaseorderItemDto);
  }
  // @Get('gato')
  @Post('bulk')
  async createMany(@Body() dto: CreatePurchaseOrderIDto){

    return this.purchaseorderItemService.createPurchaseOrderItems(
      dto
    );
   }

  @Get()
  findAll() {
    return this.purchaseorderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseorderItemService.findOne(+id);
  }
  @Get('order/:id')
  findOrder(@Param('id') id: string) {
    return this.purchaseorderItemService.findByOrder(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseorderItemDto: UpdatePurchaseorderItemDto,
  ) {
    return this.purchaseorderItemService.update(
      +id,
      updatePurchaseorderItemDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseorderItemService.remove(+id);
  }
}
