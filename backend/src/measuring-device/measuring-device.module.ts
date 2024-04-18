import { Module } from '@nestjs/common';
import { FilesOfDevicesService, MeasuringDeviceService, MeasuringInstrumentTypeService } from './measuring-device.service';
import { MeasuringDeviceController } from './measuring-device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { FilesOfDevices } from './entities/filesInstrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeasuringDevice, MeasuringInstrumentType,FilesOfDevices])],
  controllers: [MeasuringDeviceController],
  providers: [MeasuringDeviceService,MeasuringInstrumentTypeService,FilesOfDevicesService],
})
export class MeasuringDeviceModule {}
