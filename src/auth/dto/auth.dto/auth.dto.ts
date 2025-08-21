import { UserRole } from "@prisma/client";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class  SignInDto{
    @IsString()
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
} 

export class  SignUpDto extends SignInDto {



    @IsString()
    @IsOptional()
    name: string;
    @IsString()
    @IsOptional()
    role: UserRole = UserRole.ADMIN;

    @IsString()
    code: string;
}

