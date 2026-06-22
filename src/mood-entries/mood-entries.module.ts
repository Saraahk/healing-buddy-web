import { Module } from '@nestjs/common';
import { MoodEntriesService } from './mood-entries.service';
import { MoodEntriesController } from './mood-entries.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MoodEntriesController],
  providers: [MoodEntriesService],
})
export class MoodEntriesModule {}