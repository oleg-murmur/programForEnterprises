import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MutexServiceService } from './mutex-service.service';
import { CreateMutexServiceDto } from './dto/create-mutex-service.dto';
import { UpdateMutexServiceDto } from './dto/update-mutex-service.dto';

@Controller('mutex-service')
export class MutexServiceController {
  constructor(private readonly mutexServiceService: MutexServiceService) {}

  @Post()
  create(@Body() createMutexServiceDto: CreateMutexServiceDto) {
    return this.mutexServiceService.create(createMutexServiceDto);
  }

  @Get()
  findAll() {
    return this.mutexServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mutexServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMutexServiceDto: UpdateMutexServiceDto) {
    return this.mutexServiceService.update(+id, updateMutexServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mutexServiceService.remove(+id);
  }
}
