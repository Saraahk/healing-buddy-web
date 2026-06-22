import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() body: { email: string; password_hash: string; full_name: string; role: string }) {
    return this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}