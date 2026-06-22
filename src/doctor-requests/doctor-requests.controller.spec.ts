import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRequestsController } from './doctor-requests.controller';

describe('DoctorRequestsController', () => {
  let controller: DoctorRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorRequestsController],
    }).compile();

    controller = module.get<DoctorRequestsController>(DoctorRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
