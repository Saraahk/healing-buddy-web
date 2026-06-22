import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostLikesService } from './community-post-likes.service';

describe('CommunityPostLikesService', () => {
  let service: CommunityPostLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityPostLikesService],
    }).compile();

    service = module.get<CommunityPostLikesService>(CommunityPostLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
