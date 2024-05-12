import { Injectable } from '@nestjs/common';
import { CreateMutexServiceDto } from './dto/create-mutex-service.dto';
import { UpdateMutexServiceDto } from './dto/update-mutex-service.dto';

@Injectable()
export class MutexServiceService {
  create(createMutexServiceDto: CreateMutexServiceDto) {
    return 'This action adds a new mutexService';
  }

  findAll() {
    return `This action returns all mutexService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mutexService`;
  }

  update(id: number, updateMutexServiceDto: UpdateMutexServiceDto) {
    return `This action updates a #${id} mutexService`;
  }

  remove(id: number) {
    return `This action removes a #${id} mutexService`;
  }
}
