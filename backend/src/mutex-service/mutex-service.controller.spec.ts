import { Test, TestingModule } from '@nestjs/testing';
import { MutexServiceController } from './mutex-service.controller';
import { MutexServiceService } from './mutex-service.service';

describe('MutexServiceController', () => {
  let controller: MutexServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutexServiceController],
      providers: [MutexServiceService],
    }).compile();

    controller = module.get<MutexServiceController>(MutexServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
