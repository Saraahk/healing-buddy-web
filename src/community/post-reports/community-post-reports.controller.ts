import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommunityPostReportsService } from './community-post-reports.service';
import { CreateReportDto } from './community-post-reports.dto';

@Controller('community-post-reports')
export class CommunityPostReportsController {
  constructor(private reportsService: CommunityPostReportsService) {}

  @Get()
  getAllReports() {
    return this.reportsService.getAllReports();
  }

  @Post()
  reportPost(@Body() dto: CreateReportDto) {
    return this.reportsService.reportPost(dto);
  }
}
