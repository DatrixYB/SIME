import { IsOptional, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateCategoryDto {
// client/dto/create-client.dto.ts

  @IsString()
  name: string;


}
