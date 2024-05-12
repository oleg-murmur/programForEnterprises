import { Module } from '@nestjs/common';
import { MutexServiceService } from './mutex-service.service';
import { MutexServiceController } from './mutex-service.controller';

@Module({
  controllers: [MutexServiceController],
  providers: [MutexServiceService],
})
export class MutexServiceModule {}
