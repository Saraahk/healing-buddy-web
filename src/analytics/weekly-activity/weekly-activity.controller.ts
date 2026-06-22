import { Controller, Get } from '@nestjs/common';
import { WeeklyActivityService } from './weekly-activity.service';

@Controller('weekly-activity')
export class WeeklyActivityController {
  constructor(private service: WeeklyActivityService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
