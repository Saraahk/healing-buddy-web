import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReportDto } from './community-post-reports.dto';

@Injectable()
export class CommunityPostReportsService {
  constructor(private prisma: PrismaService) {}

  async reportPost(dto: CreateReportDto) {
    await this.prisma.communityPostReport.create({
      data: {
        post_id: dto.post_id,
        reported_by: dto.reported_by,
        report_reason: dto.report_reason,
      },
    });
    return this.prisma.communityPost.update({
      where: { id: dto.post_id },
      data: { reports_count: { increment: 1 }, is_reported: true },
    });
  }

  async getAllReports() {
    return this.prisma.communityPostReport.findMany({
      orderBy: { reported_at: 'desc' },
    });
  }
}
