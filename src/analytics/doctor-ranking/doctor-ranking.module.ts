import { Module } from '@nestjs/common';
import { DoctorRankingController } from './doctor-ranking.controller';
import { DoctorRankingService } from './doctor-ranking.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorRankingController],
  providers: [DoctorRankingService],
})
export class DoctorRankingModule {}
