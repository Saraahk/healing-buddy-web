import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WeeklyActivityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({
      select: { role: true, created_at: true },
    });

    const now = new Date();
    const months: Record<string, { patients: number; doctors: number; buddies: number; family: number }> = {};

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString('en-US', { month: 'short' });
      months[key] = { patients: 0, doctors: 0, buddies: 0, family: 0 };
    }

    for (const u of users) {
      const d = new Date(u.created_at);
      const monthDiff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
      if (monthDiff < 0 || monthDiff > 5) continue;
      const key = d.toLocaleDateString('en-US', { month: 'short' });
      if (!months[key]) continue;
      if (u.role === 'Patient')              months[key].patients++;
      else if (u.role === 'Doctor')          months[key].doctors++;
      else if (u.role === 'Healing Buddy')   months[key].buddies++;
      else if (u.role === 'Family Member')   months[key].family++;
    }

    return Object.entries(months).map(([month, counts]) => ({
      week_start_date:       month,
      day_of_week:           month,
      patients_active:       counts.patients,
      doctors_active:        counts.doctors,
      healing_buddies_active: counts.buddies,
      family_members_active: counts.family,
    }));
  }
}
