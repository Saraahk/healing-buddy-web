import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorRatingsService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    doctor_id: string;
    patient_id: string;
    rating: number;
    review_text?: string;
  }) {
    return this.prisma.doctorRating.create({
      data: {
        doctor_id: data.doctor_id,
        patient_id: data.patient_id,
        rating: data.rating,
        review_text: data.review_text,
      },
    });
  }

  findAll() {
    return this.prisma.doctorRating.findMany({
      include: { doctor: true, patient: true },
    });
  }

  async findOne(id: string) {
    const rating = await this.prisma.doctorRating.findUnique({
      where: { id },
      include: { doctor: true, patient: true },
    });
    if (!rating) throw new NotFoundException('Rating not found');
    return rating;
  }

  async update(id: string, data: Partial<{ rating: number; review_text: string }>) {
    await this.findOne(id);
    return this.prisma.doctorRating.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.doctorRating.delete({ where: { id } });
  }
}