import { Test, TestingModule } from '@nestjs/testing';
import { PatientHealingBuddiesService } from './patient-healing-buddies.service';

describe('PatientHealingBuddiesService', () => {
  let service: PatientHealingBuddiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientHealingBuddiesService],
    }).compile();

    service = module.get<PatientHealingBuddiesService>(PatientHealingBuddiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
