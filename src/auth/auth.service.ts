// auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/model/users/user.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { SignInDto, SignUpDto } from './dto/auth.dto/auth.dto';

type AuthResult = {
  access_token: string;
  refresh_token: string;
  user: { id: string | number; email: string; name: string; role: string };
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens(payload: Record<string, any>) {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h', // 15 minutos
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h', // 7 días
    });

    return { access_token, refresh_token };
  }

  async signUp(dto: SignUpDto): Promise<AuthResult> {
    
    const existingUser = await this.usersService.findUser({
      email: dto.email,
    });
    if (existingUser) throw new ConflictException('El usuario ya existe');

    // const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
      role: dto.role ?? UserRole.ADMIN,
      image: 'default.png',
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const { access_token, refresh_token } = await this.generateTokens(payload);

    // Guardar refresh token hash en la BD
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    // await this.usersService.updateRefreshToken(newUser.id, hashedRefreshToken);

    return {
      access_token,
      refresh_token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    };
  }

  async signIn(dto: SignInDto): Promise<AuthResult> {
    console.log("Attempting to sign  service in with:", dto);
    console.log("UserService instance:", dto.email);
    const user = await this.usersService.findUser( dto );
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches)
      throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const { access_token, refresh_token } = await this.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    // await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async logout(userId: string | number) {
    // await this.usersService.updateRefreshToken(userId, null);
    return { success: true };
  }

  // async refreshTokens(userId:  number, refreshToken: string) {
  //   const user = await this.usersService.findOne(userId);
  //   if (!user || !user.refreshToken)
  //     throw new UnauthorizedException('Acceso denegado');

  //   const refreshTokenMatches = await bcrypt.compare(
  //     refreshToken,
  //     user.refreshToken,
  //   );
  //   if (!refreshTokenMatches)
  //     throw new UnauthorizedException('Acceso denegado');

  //   const payload = {
  //     sub: user.id,
  //     email: user.email,
  //     role: user.role,
  //   };

  //   const { access_token, refresh_token } = await this.generateTokens(payload);

  //   const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
  //   // await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

  //   return { access_token, refresh_token };
  // }
}
