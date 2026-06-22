import { Test, TestingModule } from '@nestjs/testing';
import { UploadedDocumentsService } from './uploaded-documents.service';

describe('UploadedDocumentsService', () => {
  let service: UploadedDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadedDocumentsService],
    }).compile();

    service = module.get<UploadedDocumentsService>(UploadedDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
