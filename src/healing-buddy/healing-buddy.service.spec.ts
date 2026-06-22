import { Test, TestingModule } from '@nestjs/testing';
import { HealingBuddyService } from './healing-buddy.service';

describe('HealingBuddyService', () => {
  let service: HealingBuddyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealingBuddyService],
    }).compile();

    service = module.get<HealingBuddyService>(HealingBuddyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
