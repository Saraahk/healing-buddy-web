import { Test, TestingModule } from '@nestjs/testing';
import { DoctorRatingsController } from './doctor-ratings.controller';

describe('DoctorRatingsController', () => {
  let controller: DoctorRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorRatingsController],
    }).compile();

    controller = module.get<DoctorRatingsController>(DoctorRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
