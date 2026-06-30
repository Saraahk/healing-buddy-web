import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnnouncementDto } from './announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async getAllAnnouncements() {
    return this.prisma.announcement.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async createAnnouncement(dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        title: dto.title,
        message: dto.message,
        target_audience: dto.target_audience,
        created_by: dto.created_by,
        status: dto.status ?? 'Draft',
      },
    });
  }

  async sendAnnouncement(id: string) {
    return this.prisma.announcement.update({
      where: { id },
      data: { status: 'Sent', sent_at: new Date() },
    });
  }

  async deleteAnnouncement(id: string) {
    return this.prisma.announcement.delete({
      where: { id },
    });
  }

  async getSentForDoctor() {
    return this.prisma.announcement.findMany({
      where: { status: 'Sent' },
      orderBy: { sent_at: 'desc' },
      take: 20,
      select: { id: true, title: true, message: true, sent_at: true },
    });
  }
}
