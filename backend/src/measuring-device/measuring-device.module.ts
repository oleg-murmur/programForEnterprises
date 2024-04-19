import { Module } from '@nestjs/common';
import { MeasuringDeviceService, MeasuringInstrumentTypeService } from './measuring-device.service';
import { MeasuringDeviceController } from './measuring-device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { FilesOfDevices } from './entities/filesInstrument.entity';
import { FilesOfDevicesService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasuringDevice, MeasuringInstrumentType])],
  controllers: [MeasuringDeviceController],
  providers: [MeasuringDeviceService,MeasuringInstrumentTypeService],
})
export class MeasuringDeviceModule {}
