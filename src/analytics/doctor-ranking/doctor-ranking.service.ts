import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorRankingService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.doctorRanking.findMany({
      orderBy: { rank_position: 'asc' },
    });
  }
}
