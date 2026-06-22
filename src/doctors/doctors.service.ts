import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    user_id: string;
    specialty: string;
    sub_specialty?: string;
    license_number?: string;
    years_of_experience?: number;
    biography?: string;
    consultation_fee?: number;
    telehealth_enabled?: boolean;
    in_clinic_enabled?: boolean;
    clinic_address?: string;
    clinic_city?: string;
    clinic_zip_code?: string;
  }) {
    return this.prisma.doctor.create({
      data: {
        user_id: data.user_id,
        specialty: data.specialty,
        sub_specialty: data.sub_specialty,
        license_number: data.license_number,
        years_of_experience: data.years_of_experience,
        biography: data.biography,
        consultation_fee: data.consultation_fee,
        telehealth_enabled: data.telehealth_enabled ?? true,
        in_clinic_enabled: data.in_clinic_enabled ?? true,
        clinic_address: data.clinic_address,
        clinic_city: data.clinic_city,
        clinic_zip_code: data.clinic_zip_code,
        joined_at: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.doctor.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, data: Partial<{ specialty: string; biography: string; consultation_fee: number; is_verified: boolean }>) {
    await this.findOne(id);
    return this.prisma.doctor.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.doctor.delete({ where: { id } });
  }
}