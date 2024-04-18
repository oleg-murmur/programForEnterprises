import { Test, TestingModule } from '@nestjs/testing';
import { MeasuringDeviceController } from './measuring-device.controller';
import { MeasuringDeviceService } from './measuring-device.service';

describe('MeasuringDeviceController', () => {
  let controller: MeasuringDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasuringDeviceController],
      providers: [MeasuringDeviceService],
    }).compile();

    controller = module.get<MeasuringDeviceController>(MeasuringDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
