import { Module } from '@nestjs/common';
import { HealingNotesService } from './healing-notes.service';
import { HealingNotesController } from './healing-notes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealingNotesController],
  providers: [HealingNotesService],
})
export class HealingNotesModule {}