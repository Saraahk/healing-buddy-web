import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRequestsService } from './doctor-requests.service';

describe('DoctorRequestsService', () => {
  let service: DoctorRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorRequestsService],
    }).compile();

    service = module.get<DoctorRequestsService>(DoctorRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
