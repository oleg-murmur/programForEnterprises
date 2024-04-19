import { Injectable } from '@nestjs/common';
import { UpdateMeasuringDeviceDto } from './dto/update-measuring-device.dto';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';

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

  async findAll(): Promise<any> {
    return this.deviceRepository.find({
      relations: {
        deviceType: true,
        files: true
      }
    });
  }

  async findOne(id: string): Promise<any> {
    return this.deviceRepository.findOne({where: {id}, relations: {
      deviceType: true,
      files: true
    }});
  }

  async update(id: number, updateMeasuringDeviceDto: UpdateMeasuringDeviceDto) {
    return `This action updates a #${id} measuringDevice`;
  }

  async remove(id: number) {
    return `This action removes a #${id} measuringDevice`;
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
    return this.typeRepository.findOne({where: {id}});
  }
}