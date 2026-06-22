
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoodEntriesService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    patient_id: string;
    mood_type?: string;
    mood_note?: string;
    entry_date: string;
    is_shared_with_family?: boolean;
    is_shared_with_buddy?: boolean;
    is_shared_with_doctor?: boolean;
  }) {
    return this.prisma.moodEntry.create({
      data: {
        patient_id: data.patient_id,
        mood_type: data.mood_type,
        mood_note: data.mood_note,
        entry_date: new Date(data.entry_date),
        is_shared_with_family: data.is_shared_with_family ?? true,
        is_shared_with_buddy: data.is_shared_with_buddy ?? true,
        is_shared_with_doctor: data.is_shared_with_doctor ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.moodEntry.findMany({ include: { patient: true } });
  }

  async findOne(id: string) {
    const entry = await this.prisma.moodEntry.findUnique({
      where: { id },
      include: { patient: true },
    });
    if (!entry) throw new NotFoundException('Mood entry not found');
    return entry;
  }

  async update(id: string, data: Partial<{ mood_type: string; mood_note: string }>) {
    await this.findOne(id);
    return this.prisma.moodEntry.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.moodEntry.delete({ where: { id } });
  }
}