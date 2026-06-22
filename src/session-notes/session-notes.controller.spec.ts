import { Test, TestingModule } from '@nestjs/testing';
import { SessionNotesController } from './session-notes.controller';

describe('SessionNotesController', () => {
  let controller: SessionNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionNotesController],
    }).compile();

    controller = module.get<SessionNotesController>(SessionNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
