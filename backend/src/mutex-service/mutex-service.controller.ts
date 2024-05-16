import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MutexServiceService } from './mutex-service.service';
import { CreateMutexServiceDto } from './dto/create-mutex-service.dto';
import { UpdateMutexServiceDto } from './dto/update-mutex-service.dto';

@Controller('mutex-service')
export class MutexServiceController {
  constructor(private readonly mutexServiceService: MutexServiceService) {}

  @Post()
  setReadStatus(@Body() createMutexServiceDto: any) {
    // console.log(createMutexServiceDto, 'setReadStatus1')
    return this.mutexServiceService.setReadStatus(createMutexServiceDto.data);
  }

  @Post('update')
  UpdateToolViewed(@Body() createMutexServiceDto: any) { // обновление информации, что прибор занят, удаление если прошло много времени
    // console.log(createMutexServiceDto.data, 'UpdateToolViewed1')
    return this.mutexServiceService.UpdateToolViewed(createMutexServiceDto.data);
  }
  @Get('check/:toolId')
  checkToolViewed(@Param('toolId') toolId: string) { // обновление информации, что прибор занят, удаление если прошло много времени
    // console.log(toolId, 'checkToolViewed1')
    return this.mutexServiceService.checkToolViewed({toolId});
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mutexServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMutexServiceDto: UpdateMutexServiceDto) {
  //   return this.mutexServiceService.update(+id, updateMutexServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mutexServiceService.remove(+id);
  // }
}
