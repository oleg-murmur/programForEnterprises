import { Module } from '@nestjs/common';
import { FilesOfDevicesService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesOfDevices } from './entities/file.entity';
import { MeasuringDeviceService } from 'src/measuring-device/measuring-device.service';
import { MeasuringDevice } from 'src/measuring-device/entities/measuring-device.entity';
import { CreateFilesDeviceDto } from './dto/create-file.dto';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([FilesOfDevices,MeasuringDevice]), ],
  controllers: [FileController],
  providers: [FilesOfDevicesService,MeasuringDeviceService,CreateFilesDeviceDto,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class FileModule {}
