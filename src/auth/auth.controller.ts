import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email and password are required');
    }
    return this.authService.adminLogin(body.email, body.password);
  }

  @Post('doctor/login')
  async doctorLogin(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email and password are required');
    }
    return this.authService.doctorLogin(body.email, body.password);
  }
}
