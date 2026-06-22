import { Controller, Get, Param } from '@nestjs/common';
import { UserActivityLogService } from './user-activity-log.service';

@Controller('user-activity-log')
export class UserActivityLogController {
  constructor(private service: UserActivityLogService) {}

  @Get(':user_id')
  getByUser(@Param('user_id') user_id: string) {
    return this.service.getByUser(user_id);
  }
}
