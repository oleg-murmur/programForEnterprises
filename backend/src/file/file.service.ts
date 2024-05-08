import { Injectable } from '@nestjs/common';
import { CreateFilesDeviceForDB } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesOfDevices } from './entities/file.entity';
import { MeasuringDevice } from 'src/measuring-device/entities/measuring-device.entity';

@Injectable()
export class  FilesOfDevicesService{
  constructor(
    @InjectRepository(FilesOfDevices)
    private filesRepository: Repository<FilesOfDevices>,
  ) {}


  async createFileInfo(file: Partial<CreateFilesDeviceForDB>): Promise<FilesOfDevices> {

    let newFile = this.filesRepository.create(file)

    return await this.filesRepository.save(newFile)
  }
  async findFilesOfInst(device: MeasuringDevice): Promise<any> {

    return await this.filesRepository.find({
      where: {device: device}
    });
  }
  async findOne(uid: string): Promise<FilesOfDevices> {
    return this.filesRepository.findOne({where: {uid}});
  }
}
