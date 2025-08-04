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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { CreateManyProductsDto } from './dto/create-many-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Crea un nuevo usuario. Valida con class-validator.
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return product.id;
  }
  @Post('bulk')
  async createMany(@Body() createManyDto: CreateManyProductsDto) {
    console.log('Creating many products:', createManyDto);
    console.log('Payload final:', JSON.stringify(createManyDto, null, 2));
    return this.productService.createMany(createManyDto);
  }

  /**
   * Devuelve todos los usuarios (campos seguros).
   */
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  /**
   * Devuelve un usuario por su ID (validación de número).
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  /**
   * Actualiza parcialmente un usuario.
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  /**
   * Elimina un usuario por su ID.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
  /**
   * Actualiza un usuario por su ID competamente.
   */
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
}

// // products.controller.ts
// import { Controller, Post, UploadedFile, UseInterceptors, Body, Query } from '@nestjs/common'
// import { FileInterceptor } from '@nestjs/platform-express'
// import { diskStorage } from 'multer'
// import { extname, join } from 'path'
// import { existsSync, mkdirSync } from 'fs'

// @Controller('products')
// export class ProductsController {
//   @Post('upload-image')
//   @UseInterceptors(
//     FileInterceptor('image', {
//       storage: diskStorage({
//         destination: (req, file, cb) => {
//           // Carpeta configurable
//           const targetFolder = join(__dirname, '..', '..', 'public', 'products')
//           if (!existsSync(targetFolder)) mkdirSync(targetFolder, { recursive: true })
//           cb(null, targetFolder)
//         },
//         filename: (req, file, cb) => {
//           const ext = extname(file.originalname)
//           const name = `${file.fieldname}-${Date.now()}${ext}`
//           cb(null, name)
//         },
//       }),
//     }),
//   )
//   uploadImage(@UploadedFile() file: Express.Multer.File) {
//     return { filename: file.filename, url: `/products/${file.filename}` }
//   }
// }
