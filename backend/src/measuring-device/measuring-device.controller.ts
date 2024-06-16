import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FiltersProps, MeasuringDeviceService, MeasuringInstrumentTypeService } from './measuring-device.service';
import { CreateMeasuringDeviceDto, CreateTypeDto } from './dto/create-measuring-device.dto';
import { UpdateMeasuringDeviceDto } from './dto/update-measuring-device.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { v4 as uuidv4 } from 'uuid'
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { FilesOfDevices } from './entities/filesInstrument.entity';
import { Request } from 'express';
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
  @Get('type')
 async findAllType() {
    return await this.measuringInstrumentTypeService.find();
  }
  @Get('type/:id')
 async findOneType(@Param('id') id: number) {
    return await this.measuringInstrumentTypeService.findOne(id);
  }
//   @Get('filterDateOfIssue')
//  async findAlldateOfIssue(@Body() test: Partial<{from:string,to:string}>) {
//     return await this.measuringDeviceService.findAlldateOfIssue(test);
//   }



  @Get('universalFilter')
async universalFilter(@Req() request: Request<any>): Promise<Object> {
    const [result,total] =  await this.measuringDeviceService.universalFilter(request.query);
    console.log(request.query,'request.query')
    // console.log(    {
    //   data: result,
    //   skip: total
    // })
    return  {
      data: result,
      skip: total
    }
  }
  @Get('filterDateOfIssue')
async getdata(@Req() request: Request): Promise<Object> {
    const [result,total] =  await this.measuringDeviceService.findAlldateOfIssue(request.query);
    console.log(request.query,'request.query')
    console.log(    {
      data: result,
      skip: total
    })
    return  {
      data: result,
      skip: total
    }
  }
  @Get('filterVerificationEndDate')
 async findAllVerificationEndDate(@Req() request: Request): Promise<Object> {
    const [result,total] = await this.measuringDeviceService.findAllVerificationEndDate(request.query);
    console.log(request.query,'request.query')
    console.log(    {
      data: result,
      skip: total
    })

    return  {
      data: result,
      skip: total,
    }
  }




  @Post()
  async create(@Body() createMeasuringDeviceDto: Partial<any>) {
    let typed
    if(createMeasuringDeviceDto.deviceType == "Нет информации" || createMeasuringDeviceDto.deviceType.value == "Нет информации"){
      typed = null
    }else{
      typed = await this.findOneType(createMeasuringDeviceDto.deviceType.value)
    }
    let measuringDevice = {
      id: uuidv4(),
      ...createMeasuringDeviceDto, deviceType: typed
    }
    return this.measuringDeviceService.create(measuringDevice);
  }
  @Post('edit')
  async edit(@Body() createMeasuringDeviceDto: Partial<any>) {
    let typed
    console.log(createMeasuringDeviceDto, 'CHECK')
    if(createMeasuringDeviceDto.deviceType == "Нет информации" || createMeasuringDeviceDto.deviceType.value == "Нет информации"){
      typed = null
    }else{
      if(createMeasuringDeviceDto.deviceType.value) {
        typed = await this.findOneType(createMeasuringDeviceDto.deviceType.value)
      }else{
      typed = await this.findOneType(createMeasuringDeviceDto.deviceType)
      }
    }
    let measuringDevice = {
      ...createMeasuringDeviceDto, deviceType: typed
    }
    return this.measuringDeviceService.edit(measuringDevice);
  }
  
  @Get()
  findAll(@Req() request: Request): Promise<Object> {
    return this.measuringDeviceService.findAll(request.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measuringDeviceService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMeasuringDeviceDto: UpdateMeasuringDeviceDto) {
  //   return this.measuringDeviceService.update(+id, updateMeasuringDeviceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measuringDeviceService.remove(id);
  }
}
