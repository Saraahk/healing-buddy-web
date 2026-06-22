import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealingBuddyService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    user_id: string;
    professional_title?: string;
    certifications?: string;
  }) {
    return this.prisma.healingBuddy.create({
      data: {
        user_id: data.user_id,
        professional_title: data.professional_title,
        certifications: data.certifications,
        joined_at: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.healingBuddy.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const buddy = await this.prisma.healingBuddy.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!buddy) throw new NotFoundException('Healing buddy not found');
    return buddy;
  }

  async update(id: string, data: Partial<{ professional_title: string; certifications: string }>) {
    await this.findOne(id);
    return this.prisma.healingBuddy.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.healingBuddy.delete({ where: { id } });
  }
}