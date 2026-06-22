
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyMembersService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    user_id: string;
    relationship_default?: string;
  }) {
    return this.prisma.familyMember.create({
      data: {
        user_id: data.user_id,
        relationship_default: data.relationship_default,
        joined_at: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.familyMember.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const member = await this.prisma.familyMember.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!member) throw new NotFoundException('Family member not found');
    return member;
  }

  async update(id: string, data: Partial<{ relationship_default: string }>) {
    await this.findOne(id);
    return this.prisma.familyMember.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.familyMember.delete({ where: { id } });
  }
}