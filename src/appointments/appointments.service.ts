import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    duration_minutes?: number;
    type?: string;
    chief_complaint?: string;
    notes?: string;
  }) {
    return this.prisma.appointment.create({
      data: {
        patient_id: data.patient_id,
        doctor_id: data.doctor_id,
        appointment_date: new Date(data.appointment_date),
        duration_minutes: data.duration_minutes ?? 30,
        type: data.type,
        chief_complaint: data.chief_complaint,
        notes: data.notes,
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: { patient: true, doctor: true },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async update(id: string, data: Partial<{ status: string; notes: string; cancelled_reason: string; appointment_date: string }>) {
    await this.findOne(id);
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...data,
        appointment_date: data.appointment_date ? new Date(data.appointment_date) : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.appointment.delete({ where: { id } });
  }
}