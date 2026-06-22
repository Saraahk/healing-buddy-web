import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostCommentsController } from './community-post-comments.controller';

describe('CommunityPostCommentsController', () => {
  let controller: CommunityPostCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityPostCommentsController],
    }).compile();

    controller = module.get<CommunityPostCommentsController>(CommunityPostCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
