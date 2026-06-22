import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPatientAssignmentsController } from './doctor-patient-assignments.controller';

describe('DoctorPatientAssignmentsController', () => {
  let controller: DoctorPatientAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorPatientAssignmentsController],
    }).compile();

    controller = module.get<DoctorPatientAssignmentsController>(DoctorPatientAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
