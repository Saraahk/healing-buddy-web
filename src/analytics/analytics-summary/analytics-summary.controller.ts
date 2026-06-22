import { Controller, Get } from '@nestjs/common';
import { AnalyticsSummaryService } from './analytics-summary.service';

@Controller('analytics-summary')
export class AnalyticsSummaryController {
  constructor(private service: AnalyticsSummaryService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
