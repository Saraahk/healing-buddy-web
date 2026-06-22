import { Test, TestingModule } from '@nestjs/testing';
import { SessionNotesService } from './session-notes.service';

describe('SessionNotesService', () => {
  let service: SessionNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionNotesService],
    }).compile();

    service = module.get<SessionNotesService>(SessionNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
