import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    user_id: string;
    admin_role?: string;
    permissions?: object;
  }) {
    return this.prisma.admin.create({
      data: {
        user_id: data.user_id,
        admin_role: data.admin_role,
        permissions: data.permissions ?? {},
        joined_at: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.admin.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: string, data: Partial<{ admin_role: string; permissions: object }>) {
    await this.findOne(id);
    return this.prisma.admin.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.admin.delete({ where: { id } });
  }
}