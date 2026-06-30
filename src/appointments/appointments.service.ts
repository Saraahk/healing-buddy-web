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

  findByDoctor(doctorId: string) {
    return this.prisma.appointment.findMany({
      where: { doctor_id: doctorId },
      include: { patient: { include: { user: { select: { full_name: true } } } } },
      orderBy: { appointment_date: 'asc' },
    });
  }

  findTodayByDoctor(doctorId: string) {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end   = new Date(); end.setHours(23, 59, 59, 999);
    return this.prisma.appointment.findMany({
      where: { doctor_id: doctorId, appointment_date: { gte: start, lte: end } },
      include: { patient: { include: { user: { select: { full_name: true } } } } },
      orderBy: { appointment_date: 'asc' },
    });
  }

  findTomorrowByDoctor(doctorId: string) {
    const start = new Date(); start.setDate(start.getDate() + 1); start.setHours(0, 0, 0, 0);
    const end   = new Date(); end.setDate(end.getDate() + 1);     end.setHours(23, 59, 59, 999);
    return this.prisma.appointment.findMany({
      where: { doctor_id: doctorId, appointment_date: { gte: start, lte: end } },
      include: { patient: { include: { user: { select: { full_name: true } } } } },
      orderBy: { appointment_date: 'asc' },
    });
  }

  findUpcomingByDoctor(doctorId: string) {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: { doctor_id: doctorId, appointment_date: { gt: now } },
      include: { patient: { include: { user: { select: { full_name: true, avatar_url: true } } } } },
      orderBy: { appointment_date: 'asc' },
    });
  }

  findPreviousByDoctor(doctorId: string) {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return this.prisma.appointment.findMany({
      where: { doctor_id: doctorId, appointment_date: { lt: start } },
      include: { patient: { include: { user: { select: { full_name: true, avatar_url: true } } } } },
      orderBy: { appointment_date: 'desc' },
      take: 20,
    });
  }

  findUpcomingByPatient(patientId: string) {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: { patient_id: patientId, appointment_date: { gt: now } },
      orderBy: { appointment_date: 'asc' },
    });
  }

  findPastByPatient(patientId: string) {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: { patient_id: patientId, appointment_date: { lt: now } },
      orderBy: { appointment_date: 'desc' },
      take: 20,
    });
  }

  countPatientsByDoctor(doctorId: string) {
    return this.prisma.doctorPatientAssignment.count({ where: { doctor_id: doctorId } });
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