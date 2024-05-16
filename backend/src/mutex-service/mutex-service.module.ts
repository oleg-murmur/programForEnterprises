import { Module } from '@nestjs/common';
import { MutexServiceService } from './mutex-service.service';
import { MutexServiceController } from './mutex-service.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [MutexServiceController],
  providers: [MutexServiceService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class MutexServiceModule {}
