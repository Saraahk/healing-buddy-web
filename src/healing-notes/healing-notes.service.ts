import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealingNotesService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    healing_buddy_id: string;
    patient_id: string;
    note_content: string;
    checkin_date: string;
    mood_reference?: string;
  }) {
    return this.prisma.healingNote.create({
      data: {
        healing_buddy_id: data.healing_buddy_id,
        patient_id: data.patient_id,
        note_content: data.note_content,
        checkin_date: new Date(data.checkin_date),
        mood_reference: data.mood_reference,
      },
    });
  }

  findAll() {
    return this.prisma.healingNote.findMany({
      include: { healing_buddy: true, patient: true, mood_entry: true },
    });
  }

  async findOne(id: string) {
    const note = await this.prisma.healingNote.findUnique({
      where: { id },
      include: { healing_buddy: true, patient: true, mood_entry: true },
    });
    if (!note) throw new NotFoundException('Healing note not found');
    return note;
  }

  async update(id: string, data: Partial<{ note_content: string }>) {
    await this.findOne(id);
    return this.prisma.healingNote.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.healingNote.delete({ where: { id } });
  }
}