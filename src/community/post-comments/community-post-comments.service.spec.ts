import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostCommentsService } from './community-post-comments.service';

describe('CommunityPostCommentsService', () => {
  let service: CommunityPostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityPostCommentsService],
    }).compile();

    service = module.get<CommunityPostCommentsService>(CommunityPostCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
