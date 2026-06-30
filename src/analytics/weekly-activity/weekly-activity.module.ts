import { Module } from '@nestjs/common';
import { WeeklyActivityController } from './weekly-activity.controller';
import { WeeklyActivityService } from './weekly-activity.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WeeklyActivityController],
  providers: [WeeklyActivityService],
})
export class WeeklyActivityModule {}
