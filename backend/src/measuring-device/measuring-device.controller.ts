import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeasuringDeviceService, MeasuringInstrumentTypeService } from './measuring-device.service';
import { CreateFilesDeviceDto, CreateMeasuringDeviceDto, CreateTypeDto } from './dto/create-measuring-device.dto';
import { UpdateMeasuringDeviceDto } from './dto/update-measuring-device.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { v4 as uuidv4 } from 'uuid'
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { FilesOfDevices } from './entities/filesInstrument.entity';

@Controller('measuring-device')
export class MeasuringDeviceController {
  constructor(private readonly measuringDeviceService: MeasuringDeviceService,
    private readonly measuringInstrumentTypeService: MeasuringInstrumentTypeService,
  ) {}


  @Post('type')
  createType(@Body() typeDto: Partial<CreateTypeDto>) {

    let measuringDevice = {
      ...typeDto
    }
    console.log(measuringDevice, 'typeDto')

    return this.measuringInstrumentTypeService.create(measuringDevice);
  }
  @Get('type/:id')
 async findOneType(@Param('id') id: number) {
    return await this.measuringInstrumentTypeService.findOne(id);
  }

  @Post()
  async create(@Body() createMeasuringDeviceDto: Partial<CreateMeasuringDeviceDto>) {

    let typed = await this.findOneType(createMeasuringDeviceDto.type)
    console.log(typed, 'TYYPEPTYR')
    let measuringDevice = {
      id: uuidv4(),
      ...createMeasuringDeviceDto, deviceType: typed
    }
    console.log(measuringDevice, 'measuringDevice')

    return this.measuringDeviceService.create(measuringDevice);
  }

  @Get()
  findAll() {
    return this.measuringDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.measuringDeviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeasuringDeviceDto: UpdateMeasuringDeviceDto) {
    return this.measuringDeviceService.update(+id, updateMeasuringDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measuringDeviceService.remove(+id);
  }
}
