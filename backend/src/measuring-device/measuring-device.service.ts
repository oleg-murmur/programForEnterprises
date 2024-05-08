import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMeasuringDeviceDto } from './dto/update-measuring-device.dto';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Between,FindOperator,Raw   } from 'typeorm';
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { format } from 'date-fns';
export const BetweenDates = (from: Date | string, to: Date | string) => {
 return Between(
    format(typeof from === 'string' ? new Date(from) : from, 'yyyy-MM-dd'),
    format(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd'),
  )
};


@Injectable()
export class MeasuringDeviceService {

  constructor(
    @InjectRepository(MeasuringDevice)
    private deviceRepository: Repository<MeasuringDevice>,
  ) {}
  
  async create(measuringDevice: Partial<MeasuringDevice>): Promise<MeasuringDevice> {
    let newInst = this.deviceRepository.create(measuringDevice)
    return await this.deviceRepository.save(newInst)
  }

  async findAll(query): Promise<any> {
    const take = query.take || 10
    if(query.skip < 1) query.skip = 1
    const skip = (query.skip - 1) * query.take || 0
    const keyword = query.keyword || ''
    const [result, total] = await this.deviceRepository.findAndCount({
      where: {},
      take: take,
      skip: skip,
      order: {
        created_at: "DESC"
      },
      relations: {
        deviceType: true,
        // files: true
      }
    });
    return {
      data: result,
      skip: total
    }
  }
  async findAlldateOfIssue(measuringDevice: Partial<{from: any, to: any,operator?:any}>): Promise<any> {
    console.log(measuringDevice)
    let from: Date
    let to: Date
    if(typeof  measuringDevice.from  == 'object' || typeof measuringDevice.to == 'object') {
      return []
    }
    if (typeof measuringDevice.from === 'string') {
      const date: Date = new Date(measuringDevice.from);
      from = date
  }
  if (typeof measuringDevice.to === 'string') {
    const date: Date = new Date(measuringDevice.to);
    to = date
}
    return this.deviceRepository.findAndCount({
      where: {
        dateOfIssue: BetweenDates(from, to)
      }
    });
  }
  async findAllVerificationEndDate(measuringDevice: Partial<{from: any, to: any,operator?:any}>): Promise<any> {
    console.log(measuringDevice)
    let from: Date
    let to: Date
    if (typeof measuringDevice.from === 'string') {
      const date: Date = new Date(measuringDevice.from);
      from = date
  }
  if (typeof measuringDevice.to === 'string') {
    const date: Date = new Date(measuringDevice.to);
    to = date
}
    return this.deviceRepository.findAndCount({
      where: {
        verificationEndDate: BetweenDates(from, to)
      }
    });
  }

  async findOne(id: string): Promise<any> {
    return this.deviceRepository.findOne({where: {id}, relations: {
      deviceType: true,
      files: true
    }});
  }
  async edit(measuringDevice: Partial<MeasuringDevice>): Promise<MeasuringDevice> {
    console.log(measuringDevice,'measuringDevice1')
    let newInst = await this.deviceRepository.save({id: measuringDevice.id,...measuringDevice})
    console.log(newInst,'measuringDevice2')
    return newInst
  }

  async remove(id: string): Promise<any> { 
    const entityToDelete = await this.deviceRepository.findOne({where: {id},relations: {files: true}});

    if (!entityToDelete) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return this.deviceRepository.remove(entityToDelete);
}
}

export class  MeasuringInstrumentTypeService{
  constructor(
    @InjectRepository(MeasuringInstrumentType)
    private typeRepository: Repository<MeasuringInstrumentType>,
  ) {}

  async create(measuringDevice: Partial<MeasuringInstrumentType>): Promise<MeasuringInstrumentType> {

    let newInst = this.typeRepository.create(measuringDevice)

    return await this.typeRepository.save(newInst)
  }
  async findOne(id: number): Promise<MeasuringInstrumentType> {
    return this.typeRepository.findOne({where: {value: id}});
  }
  async find(): Promise<any> {
    return this.typeRepository.find();
  }
}