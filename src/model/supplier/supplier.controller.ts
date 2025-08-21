import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  // @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  // @ApiResponse({ status: 201, description: 'Proveedor creado exitosamente.' })
  async create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto);
  }
  @Get('top')
  async getTopSuppliers() {
    return this.supplierService.getTopSuppliers();
  }
  @Get()
  // @ApiOperation({ summary: 'Listar todos los proveedores' })
  async findAll() {
    return this.supplierService.findAll();
  }
  @Get()
  // @ApiOperation({ summary: 'Listar todos los proveedores' })
  async findSuppliers() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  // @ApiOperation({ summary: 'Obtener proveedor por ID' })
  async findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new NotFoundException('El ID debe ser un número');
    }
    const supplier = await this.supplierService.findOne(Number(id));
    if (!supplier) throw new NotFoundException('Proveedor no encontrado');
    return supplier;
  }

  @Patch(':id')
  // @ApiOperation({ summary: 'Actualizar proveedor por ID' })
  async update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    // console.log("Updating supplier with ID:", id);
    const supplier = await this.findOne(id);
    console.log('Updating supplier:', supplier);
    return this.supplierService.update(Number(id), dto);
    // return dto;
  }

  @Delete(':id')
  // @ApiOperation({ summary: 'Eliminar proveedor por ID' })
  async remove(@Param('id') id: string) {
    const supplier = await this.findOne(id);
    return this.supplierService.remove(supplier.id);
  }
}
