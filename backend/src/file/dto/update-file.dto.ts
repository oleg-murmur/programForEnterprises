import { PartialType } from '@nestjs/mapped-types';
import { MeasuringDevice } from './create-file.dto';

export class UpdateFileDto extends PartialType(MeasuringDevice) {}
