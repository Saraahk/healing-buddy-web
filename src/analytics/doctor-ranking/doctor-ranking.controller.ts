import { Controller, Get } from '@nestjs/common';
import { DoctorRankingService } from './doctor-ranking.service';

@Controller('doctor-ranking')
export class DoctorRankingController {
  constructor(private service: DoctorRankingService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
