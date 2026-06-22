import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostReportsService } from './community-post-reports.service';

describe('CommunityPostReportsService', () => {
  let service: CommunityPostReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityPostReportsService],
    }).compile();

    service = module.get<CommunityPostReportsService>(CommunityPostReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
