import { Module } from '@nestjs/common';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from './user-activity-log.service';

@Module({
  controllers: [UserActivityLogController],
  providers: [UserActivityLogService],
})
export class UserActivityLogModule {}
