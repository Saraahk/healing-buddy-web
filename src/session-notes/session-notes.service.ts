import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionNotesService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    doctor_id: string;
    patient_id: string;
    appointment_id?: string;
    note_content: string;
    is_visible_to_patient?: boolean;
    is_visible_to_buddy?: boolean;
  }) {
    return this.prisma.sessionNote.create({
      data: {
        doctor_id: data.doctor_id,
        patient_id: data.patient_id,
        appointment_id: data.appointment_id,
        note_content: data.note_content,
        is_visible_to_patient: data.is_visible_to_patient ?? false,
        is_visible_to_buddy: data.is_visible_to_buddy ?? false,
      },
    });
  }

  findAll() {
    return this.prisma.sessionNote.findMany({
      include: { doctor: true, patient: true, appointment: true },
    });
  }

  async findOne(id: string) {
    const note = await this.prisma.sessionNote.findUnique({
      where: { id },
      include: { doctor: true, patient: true, appointment: true },
    });
    if (!note) throw new NotFoundException('Session note not found');
    return note;
  }

  async update(id: string, data: Partial<{ note_content: string; is_visible_to_patient: boolean; is_visible_to_buddy: boolean }>) {
    await this.findOne(id);
    return this.prisma.sessionNote.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.sessionNote.delete({ where: { id } });
  }
}