import { Module } from '@nestjs/common';
import { WeeklyActivityController } from './weekly-activity.controller';
import { WeeklyActivityService } from './weekly-activity.service';

@Module({
  controllers: [WeeklyActivityController],
  providers: [WeeklyActivityService],
})
export class WeeklyActivityModule {}
