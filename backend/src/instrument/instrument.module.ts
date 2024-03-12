import { Module } from '@nestjs/common';
import { CreatingModule } from './creating/creating.module';
import { InstrumentController } from './instrument.controller';

@Module({
  imports: [CreatingModule],
  controllers: [InstrumentController]
})
export class InstrumentModule {}
