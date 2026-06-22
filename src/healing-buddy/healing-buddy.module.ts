import { Module } from '@nestjs/common';
import { HealingBuddyService } from './healing-buddy.service';
import { HealingBuddyController } from './healing-buddy.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealingBuddyController],
  providers: [HealingBuddyService],
})
export class HealingBuddyModule {}