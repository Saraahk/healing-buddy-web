import { Test, TestingModule } from '@nestjs/testing';
import { FamilyPatientConnectionsController } from './family-patient-connections.controller';

describe('FamilyPatientConnectionsController', () => {
  let controller: FamilyPatientConnectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyPatientConnectionsController],
    }).compile();

    controller = module.get<FamilyPatientConnectionsController>(FamilyPatientConnectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
