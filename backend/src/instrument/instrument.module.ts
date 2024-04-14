import { Module } from '@nestjs/common';
import { CreatingModule } from './creating/creating.module';
import { InstrumentController } from './instrument.controller';

import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [CreatingModule, NestjsFormDataModule],
  controllers: [InstrumentController]
})
export class InstrumentModule {}
