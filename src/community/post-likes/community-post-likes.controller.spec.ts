import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostLikesController } from './community-post-likes.controller';

describe('CommunityPostLikesController', () => {
  let controller: CommunityPostLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityPostLikesController],
    }).compile();

    controller = module.get<CommunityPostLikesController>(CommunityPostLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
