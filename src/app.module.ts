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
import { AuthModule } from './auth/auth.module';
import { AnalyticsSummaryModule } from './analytics/analytics-summary/analytics-summary.module';
import { WeeklyActivityModule } from './analytics/weekly-activity/weekly-activity.module';
import { DoctorRankingModule } from './analytics/doctor-ranking/doctor-ranking.module';
import { CommunityPostsModule } from './community/posts/community-posts.module';
import { CommunityPostReportsModule } from './community/post-reports/community-post-reports.module';
import { AnnouncementModule } from './announcements/announcement/announcement.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PatientsModule,
    DoctorsModule,
    HealingBuddyModule,
    FamilyMembersModule,
    AdminModule,
    FamilyPatientConnectionsModule,
    DoctorPatientAssignmentsModule,
    PatientHealingBuddiesModule,
    AppointmentsModule,
    SessionNotesModule,
    MoodEntriesModule,
    HealingNotesModule,
    DoctorRatingsModule,
    UploadedDocumentsModule,
    DoctorRequestsModule,
    AuthModule,
    AnalyticsSummaryModule,
    WeeklyActivityModule,
    DoctorRankingModule,
    CommunityPostsModule,
    CommunityPostReportsModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
