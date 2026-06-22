import { Test, TestingModule } from '@nestjs/testing';
import { PatientHealingBuddiesController } from './patient-healing-buddies.controller';

describe('PatientHealingBuddiesController', () => {
  let controller: PatientHealingBuddiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientHealingBuddiesController],
    }).compile();

    controller = module.get<PatientHealingBuddiesController>(PatientHealingBuddiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
