import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostsService } from './community-posts.service';

describe('CommunityPostsService', () => {
  let service: CommunityPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityPostsService],
    }).compile();

    service = module.get<CommunityPostsService>(CommunityPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
