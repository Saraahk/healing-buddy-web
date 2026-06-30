import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorRankingService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const doctors = await this.prisma.doctor.findMany({
      take: 5,
      orderBy: [{ rating_average: 'desc' }, { rating_count: 'desc' }],
      include: {
        user: { select: { full_name: true } },
        _count: { select: { patient_assignments: true } },
      },
    });

    return doctors.map((d, i) => ({
      id:                  d.id,
      rank_position:       i + 1,
      total_patients_count: d._count.patient_assignments,
      average_rating:      d.rating_average,
      doctor: {
        specialty: d.specialty,
        user: { full_name: d.user.full_name },
      },
    }));
  }
}
