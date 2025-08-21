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
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  /**
   * Crea un nuevo usuario. Valida con class-validator.
   */
  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createClientDto: CreateClientDto) {
    console.log('Creating client with data:', createClientDto);
    return this.clientService.create(createClientDto);
  }

  /**
   * Devuelve todos los usuarios (campos seguros).
   */
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }
    /**
   * Devuelve el ultimo client (campos seguros).
   */
  @Get('last')
  async findLast() {
    return this.clientService.findLast();
  }


  /**
   * Devuelve un usuario por su ID (validación de número).
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  /**
   * Actualiza parcialmente un usuario.
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  /**
   * Elimina un usuario por su ID.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(id);
  }
}
