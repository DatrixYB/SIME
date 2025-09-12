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
  UseGuards,  Headers
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from 'src/guard/JwtAuthGuard';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { JwtService } from '@nestjs/jwt';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService) {}
  /**
   * Crea un nuevo usuario. Valida con class-validator.
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get('debug-token')
getToken(@Headers('authorization') authHeader: string) {
  console.log('🔍 Header Authorization:', authHeader);
  return { authHeader };
}




@Get('manual-verify')
manualVerify(@Headers('authorization') authHeader: string) {
  const token = authHeader?.split(' ')[1];
  const payload = this.jwtService.verify(token); // lanza error si está mal
  console.log('🔍 Payload manual:', payload);
  return payload;
}
  /**
   * Devuelve todos los usuarios (campos seguros).
   */
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  /**
   * Devuelve un usuario por su ID (validación de número).
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  /**
   * Actualiza parcialmente un usuario.
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
