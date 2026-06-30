import { Module } from '@nestjs/common';
import { AnalyticsSummaryController } from './analytics-summary.controller';
import { AnalyticsSummaryService } from './analytics-summary.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsSummaryController],
  providers: [AnalyticsSummaryService],
})
export class AnalyticsSummaryModule {}
