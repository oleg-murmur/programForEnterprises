import { PartialType } from '@nestjs/mapped-types';
import { CreateMutexServiceDto } from './create-mutex-service.dto';

export class UpdateMutexServiceDto extends PartialType(CreateMutexServiceDto) {}
