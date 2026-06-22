import { Test, TestingModule } from '@nestjs/testing';
import { HealingNotesController } from './healing-notes.controller';

describe('HealingNotesController', () => {
  let controller: HealingNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealingNotesController],
    }).compile();

    controller = module.get<HealingNotesController>(HealingNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
