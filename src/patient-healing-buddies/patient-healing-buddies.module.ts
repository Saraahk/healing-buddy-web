import { Module } from '@nestjs/common';
import { PatientHealingBuddiesService } from './patient-healing-buddies.service';
import { PatientHealingBuddiesController } from './patient-healing-buddies.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PatientHealingBuddiesController],
  providers: [PatientHealingBuddiesService],
})
export class PatientHealingBuddiesModule {}