// client/dto/create-client.dto.ts
import { IsOptional, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phone?: string;
}
