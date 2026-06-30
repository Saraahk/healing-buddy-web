import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: { email: string; password_hash: string; full_name: string; role: string }) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({ where: { id }, data: { avatar_url: avatarUrl } });
  }
}