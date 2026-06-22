import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipientDto } from './announcement-recipient.dto';

@Injectable()
export class AnnouncementRecipientService {
  constructor(private prisma: PrismaService) {}

  async getRecipients(announcement_id: string) {
    return this.prisma.announcementRecipient.findMany({
      where: { announcement_id },
    });
  }

  async addRecipient(dto: CreateRecipientDto) {
    return this.prisma.announcementRecipient.create({
      data: {
        announcement_id: dto.announcement_id,
        user_id: dto.user_id,
      },
    });
  }

  async markAsRead(announcement_id: string, user_id: string) {
    return this.prisma.announcementRecipient.update({
      where: { announcement_id_user_id: { announcement_id, user_id } },
      data: { is_read: true, read_at: new Date() },
    });
  }
}
