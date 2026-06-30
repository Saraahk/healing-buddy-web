import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyPatientConnectionsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    patient_id: string;
    family_member_id?: string;
    family_member_email?: string;
    family_member_name?: string;
    relationship: string;
    can_view_mood?: boolean;
    can_view_documents?: boolean;
    can_chat_with_doctor?: boolean;
    can_chat_with_healing_buddy?: boolean;
    can_receive_emergency_alerts?: boolean;
  }) {
    return this.prisma.familyPatientConnection.create({
      data: {
        patient_id: data.patient_id,
        family_member_id: data.family_member_id,
        family_member_email: data.family_member_email,
        family_member_name: data.family_member_name,
        relationship: data.relationship,
        can_view_mood: data.can_view_mood ?? true,
        can_view_documents: data.can_view_documents ?? false,
        can_chat_with_doctor: data.can_chat_with_doctor ?? false,
        can_chat_with_healing_buddy: data.can_chat_with_healing_buddy ?? false,
        can_receive_emergency_alerts: data.can_receive_emergency_alerts ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.familyPatientConnection.findMany({
      include: { patient: true, family_member: true },
    });
  }

  async findOne(id: string) {
    const conn = await this.prisma.familyPatientConnection.findUnique({
      where: { id },
      include: { patient: true, family_member: true },
    });
    if (!conn) throw new NotFoundException('Connection not found');
    return conn;
  }

  async update(id: string, data: Partial<{ status: string; can_view_mood: boolean; can_view_documents: boolean }>) {
    await this.findOne(id);
    return this.prisma.familyPatientConnection.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.familyPatientConnection.delete({ where: { id } });
  }

  findByPatient(patientId: string) {
    return this.prisma.familyPatientConnection.findMany({
      where: { patient_id: patientId },
      include: { family_member: { include: { user: { select: { full_name: true, avatar_url: true, phone: true } } } } },
    });
  }
}