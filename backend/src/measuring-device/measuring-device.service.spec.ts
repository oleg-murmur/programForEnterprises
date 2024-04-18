import { Test, TestingModule } from '@nestjs/testing';
import { MeasuringDeviceService } from './measuring-device.service';

describe('MeasuringDeviceService', () => {
  let service: MeasuringDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasuringDeviceService],
    }).compile();

    service = module.get<MeasuringDeviceService>(MeasuringDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
