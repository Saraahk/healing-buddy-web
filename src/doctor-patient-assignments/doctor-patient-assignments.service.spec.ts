import { Test, TestingModule } from '@nestjs/testing';
import { DoctorPatientAssignmentsService } from './doctor-patient-assignments.service';

describe('DoctorPatientAssignmentsService', () => {
  let service: DoctorPatientAssignmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorPatientAssignmentsService],
    }).compile();

    service = module.get<DoctorPatientAssignmentsService>(DoctorPatientAssignmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
