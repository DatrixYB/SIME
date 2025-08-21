import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleService } from './sale.service';
// import {}

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  /**
   * Crea un nuevo usuario. Valida con class-validator.
   */
  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createSaleDto: CreateSaleDto) {
    console.log('createSaleDto', createSaleDto);
    return this.saleService.create(createSaleDto);
  }

  /**
   * Devuelve todos los usuarios (campos seguros).
   */
  @Get()
  async findAll() {
    return this.saleService.findAllWithRelations();
    return this.saleService.findAll();
  }
  /**
   * Devuelve todos los usuarios (campos seguros).
   */
  @Get('recent')
  async find_5LastSales() {
    return this.saleService.findLastFiveSales();
    return this.saleService.findAll();
  }

  @Get('mes')
  async salesMoth() {
    return this.saleService.getMonthlySalesData();
  }

  /**
   * Devuelve un usuario por su ID (validación de número).
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.findOne(id);
  }

  /**
   * Actualiza parcialmente un usuario.
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.update(id, updateSaleDto);
  }

  /**
   * Elimina un usuario por su ID.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.remove(id);
  }
  /**
   * Actualiza un usuario por su ID competamente.
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.update(id, updateSaleDto);
  }
}
