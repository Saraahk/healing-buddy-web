import { Module } from '@nestjs/common';
import { DoctorPatientAssignmentsService } from './doctor-patient-assignments.service';
import { DoctorPatientAssignmentsController } from './doctor-patient-assignments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorPatientAssignmentsController],
  providers: [DoctorPatientAssignmentsService],
})
export class DoctorPatientAssignmentsModule {}