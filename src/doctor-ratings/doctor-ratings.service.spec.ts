import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRatingsService } from './doctor-ratings.service';

describe('DoctorRatingsService', () => {
  let service: DoctorRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorRatingsService],
    }).compile();

    service = module.get<DoctorRatingsService>(DoctorRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
