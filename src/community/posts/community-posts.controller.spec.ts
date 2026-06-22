import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostsController } from './community-posts.controller';

describe('CommunityPostsController', () => {
  let controller: CommunityPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityPostsController],
    }).compile();

    controller = module.get<CommunityPostsController>(CommunityPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
