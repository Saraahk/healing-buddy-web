import { Test, TestingModule } from '@nestjs/testing';
import { HealingBuddyController } from './healing-buddy.controller';

describe('HealingBuddyController', () => {
  let controller: HealingBuddyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealingBuddyController],
    }).compile();

    controller = module.get<HealingBuddyController>(HealingBuddyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
