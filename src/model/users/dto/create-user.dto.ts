import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
  
  @IsString()
  @IsOptional()
  image: string;





}
// // // client
// import { IsOptional, IsString, IsEmail } from 'class-validator';

// export class CreateClientDto {
//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsEmail()
//   email?: string;

//   @IsOptional()
//   @IsString()
//   phone?: string;
// }

// product
// import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

// export class CreateProductDto {
//   @IsString()
//   name: string;

//   @IsNumber()
//   price: number;

//   @IsNumber()
//   stock: number;

//   @IsOptional()
//   @IsString()
//   description?: string;

//   @IsOptional()
//   @IsBoolean()
//   isActive?: boolean;
// }

// createsale
// import { IsInt, IsNumber } from 'class-validator';

// export class CreateSaleItemDto {
//   @IsInt()
//   productId: number;

//   @IsInt()
//   quantity: number;

//   @IsNumber()
//   price: number;
// }
// createSale
// import { IsInt, IsNumber, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';
// import { CreateSaleItemDto } from './create-sale-item.dto';

// export class CreateSaleDto {
//   @IsInt()
//   clientId: number;

//   @IsInt()
//   userId: number;

//   @IsInt()
//   paymentId: number;

//   @IsNumber()
//   total: number;

//   @ValidateNested({ each: true })
//   @Type(() => CreateSaleItemDto)
//   items: CreateSaleItemDto[];
// }
// import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
// import { PaymentType } from '@prisma/client';

// export class CreatePaymentDto {
//   @IsEnum(PaymentType)
//   method: PaymentType;

//   @IsOptional()
//   @IsString()
//   reference?: string;

//   @IsNumber()
//   amount: number;
// }
