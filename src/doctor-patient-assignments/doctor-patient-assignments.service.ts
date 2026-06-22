import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorPatientAssignmentsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    doctor_id: string;
    patient_id: string;
    is_primary?: boolean;
    patient_status?: string;
  }) {
    return this.prisma.doctorPatientAssignment.create({
      data: {
        doctor_id: data.doctor_id,
        patient_id: data.patient_id,
        is_primary: data.is_primary ?? true,
        patient_status: data.patient_status ?? 'Active',
        assigned_since: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.doctorPatientAssignment.findMany({
      include: { doctor: true, patient: true },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.doctorPatientAssignment.findUnique({
      where: { id },
      include: { doctor: true, patient: true },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async update(id: string, data: Partial<{ is_primary: boolean; patient_status: string }>) {
    await this.findOne(id);
    return this.prisma.doctorPatientAssignment.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.doctorPatientAssignment.delete({ where: { id } });
  }
}