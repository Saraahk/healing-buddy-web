import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get()
  getAllAnnouncements() {
    return this.announcementService.getAllAnnouncements();
  }

  @Post()
  createAnnouncement(@Body() dto: CreateAnnouncementDto) {
    return this.announcementService.createAnnouncement(dto);
  }

  @Patch(':id/send')
  sendAnnouncement(@Param('id') id: string) {
    return this.announcementService.sendAnnouncement(id);
  }

  @Get('doctor/notifications')
  getForDoctor() {
    return this.announcementService.getSentForDoctor();
  }

  @Delete(':id')
  deleteAnnouncement(@Param('id') id: string) {
    return this.announcementService.deleteAnnouncement(id);
  }
}
