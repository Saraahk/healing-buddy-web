import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementRecipientController } from './announcement-recipient.controller';

describe('AnnouncementRecipientController', () => {
  let controller: AnnouncementRecipientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementRecipientController],
    }).compile();

    controller = module.get<AnnouncementRecipientController>(AnnouncementRecipientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
