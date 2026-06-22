import { Module } from '@nestjs/common';
import { DoctorRequestsService } from './doctor-requests.service';
import { DoctorRequestsController } from './doctor-requests.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorRequestsController],
  providers: [DoctorRequestsService],
  exports: [DoctorRequestsService],
})
export class DoctorRequestsModule {}