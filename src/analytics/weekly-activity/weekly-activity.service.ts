import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WeeklyActivityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.weeklyUserActivity.findMany({
      orderBy: { week_start_date: 'desc' },
    });
  }
}
