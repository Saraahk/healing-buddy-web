import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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

  @Delete(':id')
  deleteAnnouncement(@Param('id') id: string) {
    return this.announcementService.deleteAnnouncement(id);
  }
}
