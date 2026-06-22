import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { HealingBuddyModule } from './healing-buddy/healing-buddy.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { AdminModule } from './admin/admin.module';
import { FamilyPatientConnectionsModule } from './family-patient-connections/family-patient-connections.module';
import { DoctorPatientAssignmentsModule } from './doctor-patient-assignments/doctor-patient-assignments.module';
import { PatientHealingBuddiesModule } from './patient-healing-buddies/patient-healing-buddies.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SessionNotesModule } from './session-notes/session-notes.module';
import { MoodEntriesModule } from './mood-entries/mood-entries.module';
import { HealingNotesModule } from './healing-notes/healing-notes.module';
import { DoctorRatingsModule } from './doctor-ratings/doctor-ratings.module';
import { UploadedDocumentsModule } from './uploaded-documents/uploaded-documents.module';
import { DoctorRequestsModule } from './doctor-requests/doctor-requests.module';

@Module({
  imports: [UsersModule, PrismaModule, PatientsModule, DoctorsModule, HealingBuddyModule, FamilyMembersModule, AdminModule, FamilyPatientConnectionsModule, DoctorPatientAssignmentsModule, PatientHealingBuddiesModule, AppointmentsModule, SessionNotesModule, MoodEntriesModule, HealingNotesModule, DoctorRatingsModule, UploadedDocumentsModule, DoctorRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
