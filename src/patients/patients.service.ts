import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    user_id: string;
    date_of_birth?: string;
    gender?: string;
    blood_type?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    emergency_contact_relationship?: string;
    primary_condition?: string;
    severity?: string;
    diagnosed_year?: number;
    preferred_consultation_type?: string;
  }) {
    return this.prisma.patient.create({
      data: {
        user_id: data.user_id,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
        gender: data.gender,
        blood_type: data.blood_type,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        emergency_contact_relationship: data.emergency_contact_relationship,
        primary_condition: data.primary_condition,
        severity: data.severity,
        diagnosed_year: data.diagnosed_year,
        preferred_consultation_type: data.preferred_consultation_type,
        joined_date: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany({ include: { user: true } });
  }

  findByDoctor(doctorId: string) {
    return this.prisma.patient.findMany({
      where: { doctor_assignments: { some: { doctor_id: doctorId } } },
      include: { user: { select: { full_name: true, avatar_url: true, email: true, phone: true } } },
      orderBy: { joined_date: 'desc' },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, data: Partial<{ gender: string; primary_condition: string; severity: string }>) {
    await this.findOne(id);
    return this.prisma.patient.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.patient.delete({ where: { id } });
  }
}