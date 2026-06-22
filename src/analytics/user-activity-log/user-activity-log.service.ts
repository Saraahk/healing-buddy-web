import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserActivityLogService {
  constructor(private prisma: PrismaService) {}

  async getByUser(user_id: string) {
    return this.prisma.userActivityLog.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
    });
  }
}
