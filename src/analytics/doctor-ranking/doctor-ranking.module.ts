import { Module } from '@nestjs/common';
import { DoctorRankingController } from './doctor-ranking.controller';
import { DoctorRankingService } from './doctor-ranking.service';

@Module({
  controllers: [DoctorRankingController],
  providers: [DoctorRankingService],
})
export class DoctorRankingModule {}
