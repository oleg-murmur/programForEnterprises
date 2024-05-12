import { Test, TestingModule } from '@nestjs/testing';
import { MutexServiceService } from './mutex-service.service';

describe('MutexServiceService', () => {
  let service: MutexServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutexServiceService],
    }).compile();

    service = module.get<MutexServiceService>(MutexServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
