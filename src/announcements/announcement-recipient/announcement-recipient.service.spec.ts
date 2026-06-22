import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementRecipientService } from './announcement-recipient.service';

describe('AnnouncementRecipientService', () => {
  let service: AnnouncementRecipientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnouncementRecipientService],
    }).compile();

    service = module.get<AnnouncementRecipientService>(AnnouncementRecipientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
