import { Test, TestingModule } from '@nestjs/testing';
import { HealingNotesService } from './healing-notes.service';

describe('HealingNotesService', () => {
  let service: HealingNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealingNotesService],
    }).compile();

    service = module.get<HealingNotesService>(HealingNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
