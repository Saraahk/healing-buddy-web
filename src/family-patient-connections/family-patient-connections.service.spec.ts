import { Test, TestingModule } from '@nestjs/testing';
import { FamilyPatientConnectionsService } from './family-patient-connections.service';

describe('FamilyPatientConnectionsService', () => {
  let service: FamilyPatientConnectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyPatientConnectionsService],
    }).compile();

    service = module.get<FamilyPatientConnectionsService>(FamilyPatientConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
