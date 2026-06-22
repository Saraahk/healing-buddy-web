import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientHealingBuddiesService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    healing_buddy_id: string;
    patient_id: string;
    relationship_type?: string;
    assigned_doctor_name?: string;
    assigned_doctor_id?: string;
  }) {
    return this.prisma.patientHealingBuddy.create({
      data: {
        healing_buddy_id: data.healing_buddy_id,
        patient_id: data.patient_id,
        relationship_type: data.relationship_type,
        assigned_doctor_name: data.assigned_doctor_name,
        assigned_doctor_id: data.assigned_doctor_id,
        support_since: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.patientHealingBuddy.findMany({
      include: { healing_buddy: true, patient: true, assigned_doctor: true },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.patientHealingBuddy.findUnique({
      where: { id },
      include: { healing_buddy: true, patient: true, assigned_doctor: true },
    });
    if (!item) throw new NotFoundException('Patient-healing buddy link not found');
    return item;
  }

  async update(id: string, data: Partial<{ relationship_type: string; is_active: boolean }>) {
    await this.findOne(id);
    return this.prisma.patientHealingBuddy.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.patientHealingBuddy.delete({ where: { id } });
  }
}