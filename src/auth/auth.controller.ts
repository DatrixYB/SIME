import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Headers,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto/auth.dto';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // Registro seguro: 201 Created
  @Post('register')
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const { access_token, refresh_token, user } = await this.authService.signUp(dto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      secure: true, // obligatorio si SameSite=None
      sameSite: 'none', // permite envío cross-origin
 path: '/',

      maxAge: 1000 * 60 * 15, // 15 minutos
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'strict',
      secure: true, // obligatorio si SameSite=None
      sameSite: 'none', // permite envío cross-origin
 path: '/',

      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Cuenta creada correctamente',
      access_token,
      user,
    });
  }

  // Login seguro: 200 OK
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto, @Res() res: Response) {

    console.log("DTO LOGIN", dto)
    const { access_token, refresh_token, user } = await this.authService.signIn(dto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true, // obligatorio si SameSite=None
      sameSite: 'none', // permite envío cross-origin
 path: '/',
 domain: process.env.CORS_ORIGIN,

      // sameSite: 'strict',
      maxAge: 1000 * 60 * 15, // 15 minutos
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true, // obligatorio si SameSite=None
      sameSite: 'none', // permite envío cross-origin
 path: '/',
domain: process.env.CORS_ORIGIN,
      // sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
    console.log({
      success: true,
      message: 'Inicio de sesión exitoso',
      access_token,
    })

    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      access_token,

    });
  }

  // Logout seguro: Limpia cookies
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json({ success: true, message: 'Sesión cerrada correctamente' });
  }

  // Refresh token: Devuelve nuevo access_token
  @Get('refresh')
  async refreshToken(@Headers('authorization') authHeader: string, @Res() res: Response) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token inválido o ausente');
    }

    const refreshToken = authHeader.split(' ')[1];

    try {
      // Verificar refresh token
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET) as any;

      // Generar nuevos tokens
      const { access_token } = await this.authService.signIn({
        email: payload.email,
        password: '', // Aquí solo usamos payload para regenerar access_token
      } as SignInDto);

      // Setear nuevo access_token en cookies
      res.cookie('access_token', access_token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // sameSite: 'strict',
        secure: true, // obligatorio si SameSite=None
        sameSite: 'none', // permite envío cross-origin
 path: '/',
domain: process.env.CORS_ORIGIN,
        maxAge: 1000 * 60 * 15, // 15 minutos
      });

      return res.json({ access_token });
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  // Endpoint opcional para validar access_token (middleware puede usarlo)
  @Get('validate')
  async validate(@Headers('authorization') authHeader: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token inválido o ausente');
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return { valid: true };
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  @Get('me')
  async me(@Req() req) {
    const user = req.user; // extraído del token por tu guard JWT
    console.log("USER ME", user)
    // console.log("USER ME", req)
    const rawCookie = req.headers['cookie'];
    const cookies = parseCookies(rawCookie || '');

    const accessToken = cookies['access_token'];
    const refreshToken = cookies['refresh_token'];

    console.log('🔐 Access Token:', accessToken);
    console.log('🔄 Refresh Token:', refreshToken);
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET) as any;

    console.log('Payload del refresh token:', payload);
    return { success: true, user: payload };
  }

}
function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader
    .split(';')
    .map(cookie => cookie.trim().split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
}