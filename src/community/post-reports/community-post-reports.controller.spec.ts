import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPostReportsController } from './community-post-reports.controller';

describe('CommunityPostReportsController', () => {
  let controller: CommunityPostReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityPostReportsController],
    }).compile();

    controller = module.get<CommunityPostReportsController>(CommunityPostReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
