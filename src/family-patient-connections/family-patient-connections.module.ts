import { Module } from '@nestjs/common';
import { FamilyPatientConnectionsService } from './family-patient-connections.service';
import { FamilyPatientConnectionsController } from './family-patient-connections.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FamilyPatientConnectionsController],
  providers: [FamilyPatientConnectionsService],
})
export class FamilyPatientConnectionsModule {}