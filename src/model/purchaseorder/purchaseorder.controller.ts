import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseorderService } from './purchaseorder.service';
import { CreatePurchaseorderDto } from './dto/create-purchaseorder.dto';
import { UpdatePurchaseorderDto } from './dto/update-purchaseorder.dto';

@Controller('purchaseorder')
export class PurchaseorderController {
  constructor(private readonly purchaseorderService: PurchaseorderService) {}

  @Post()
  create(@Body() createPurchaseorderDto: CreatePurchaseorderDto) {
    return this.purchaseorderService.create(createPurchaseorderDto);
  }

  @Get()
  findAll() {
    return this.purchaseorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseorderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseorderDto: UpdatePurchaseorderDto) {
    return this.purchaseorderService.update(+id, updatePurchaseorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseorderService.remove(+id);
  }
}
