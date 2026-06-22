import { Module } from '@nestjs/common';
import { DoctorRatingsService } from './doctor-ratings.service';
import { DoctorRatingsController } from './doctor-ratings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorRatingsController],
  providers: [DoctorRatingsService],
})
export class DoctorRatingsModule {}