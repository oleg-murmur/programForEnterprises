import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasuringDeviceDto } from './create-measuring-device.dto';

export class UpdateMeasuringDeviceDto extends PartialType(CreateMeasuringDeviceDto) {}
