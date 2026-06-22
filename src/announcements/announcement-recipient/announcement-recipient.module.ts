import { Module } from '@nestjs/common';
import { AnnouncementRecipientController } from './announcement-recipient.controller';
import { AnnouncementRecipientService } from './announcement-recipient.service';

@Module({
  controllers: [AnnouncementRecipientController],
  providers: [AnnouncementRecipientService]
})
export class AnnouncementRecipientModule {}
