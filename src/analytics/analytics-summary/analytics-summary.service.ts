import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsSummaryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const [patientPosts, healingNotes, familyPosts, sessions, docs, familyConnections] = await Promise.all([
      this.prisma.communityPost.count({ where: { author_role_at_time: 'Patient' } }),
      this.prisma.healingNote.count(),
      this.prisma.communityPost.count({ where: { author_role_at_time: 'FamilyMember' } }),
      this.prisma.sessionNote.count(),
      this.prisma.uploadedDocument.count(),
      this.prisma.familyPatientConnection.count(),
    ]);

    return [{
      patient_posts_count:              patientPosts,
      healing_notes_written_count:      healingNotes,
      family_posts_count:               familyPosts,
      support_sessions_count:           sessions,
      medical_documents_uploaded_count: docs,
      family_connections_count:         familyConnections,
    }];
  }
}
