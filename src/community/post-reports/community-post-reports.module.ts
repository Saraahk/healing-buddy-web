import { Module } from '@nestjs/common';
import { CommunityPostReportsController } from './community-post-reports.controller';
import { CommunityPostReportsService } from './community-post-reports.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommunityPostReportsController],
  providers: [CommunityPostReportsService]
})
export class CommunityPostReportsModule {}
