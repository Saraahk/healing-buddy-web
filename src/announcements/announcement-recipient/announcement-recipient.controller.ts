import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AnnouncementRecipientService } from './announcement-recipient.service';
import { CreateRecipientDto } from './announcement-recipient.dto';

@Controller('announcement-recipient')
export class AnnouncementRecipientController {
  constructor(private recipientService: AnnouncementRecipientService) {}

  @Get(':announcement_id')
  getRecipients(@Param('announcement_id') announcement_id: string) {
    return this.recipientService.getRecipients(announcement_id);
  }

  @Post()
  addRecipient(@Body() dto: CreateRecipientDto) {
    return this.recipientService.addRecipient(dto);
  }

  @Patch(':announcement_id/read/:user_id')
  markAsRead(
    @Param('announcement_id') announcement_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.recipientService.markAsRead(announcement_id, user_id);
  }
}
