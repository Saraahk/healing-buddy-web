import { Module } from '@nestjs/common';
import { CommunityPostReportsController } from './community-post-reports.controller';
import { CommunityPostReportsService } from './community-post-reports.service';

@Module({
  controllers: [CommunityPostReportsController],
  providers: [CommunityPostReportsService]
})
export class CommunityPostReportsModule {}
