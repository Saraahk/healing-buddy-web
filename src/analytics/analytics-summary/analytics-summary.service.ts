import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsSummaryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.analyticsSummary.findMany({
      orderBy: { date: 'desc' },
    });
  }
}
