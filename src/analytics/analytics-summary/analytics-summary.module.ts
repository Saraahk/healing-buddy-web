import { Module } from '@nestjs/common';
import { AnalyticsSummaryController } from './analytics-summary.controller';
import { AnalyticsSummaryService } from './analytics-summary.service';

@Module({
  controllers: [AnalyticsSummaryController],
  providers: [AnalyticsSummaryService],
})
export class AnalyticsSummaryModule {}
