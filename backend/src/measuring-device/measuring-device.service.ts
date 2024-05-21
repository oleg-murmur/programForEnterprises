import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMeasuringDeviceDto } from './dto/update-measuring-device.dto';
import { MeasuringDevice } from './entities/measuring-device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Between,FindOperator,Raw, Like, In, IsNull, Not   } from 'typeorm';
import { MeasuringInstrumentType } from './entities/measuringInstrumentType.entity';
import { format } from 'date-fns';
export const BetweenDates = (from: Date | string, to: Date | string) => {
  console.log(from,'from')
  console.log(to,'to')
 return Between(
    format(typeof from === 'string' ? new Date(from) : from, 'yyyy-MM-dd'),
    format(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd'),
  )
};
type haveMetalType = 'Нет' | 'Нет информации' | 'Да'
export interface FiltersProps {
  page?: number,
  deviceName?: string;
  deviceModel?: string;
  DOI_to?: string,
  DOI_from?: string,

  VED_from?: string,
  VED_to?: string,
  
  inventoryName?: string,
  factoryNumber?: string,
  userName?: string,
  note?: string,
  haveMetal?: haveMetalType[],
  deviceType?: any[]
  sorterDateOfIssue?: 'DESC' | 'ASC' // нужна доработка, даты типа string, для правильном сортировки
  sorterVerificationEndDate?: 'DESC' | 'ASC' //  нужно преобразовывать в тип даты NULLS LAST не работает

  verificationEndDate?: 'ESC' | 'DESC' //deprecated
  orderDateOfIssue?: 'ESC' | 'DESC' //deprecated
}

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
    // const keyword = query.keyword || ''
    const [result, total] = await this.deviceRepository.findAndCount({
      where: {deleted: false},
      take: take,
      skip: skip,
      order: {
        created_at: "DESC"
      },
      relations: {
        deviceType: true
      }
    });
    return {
      data: result,
      skip: total
    }
  }
  async universalFilter(measuringDevice: FiltersProps): Promise<any> {
    // console.log(measuringDevice)
    if(measuringDevice.page < 1) measuringDevice.page = 1
    const skip = (measuringDevice.page - 1) * 10 || 0
    let from_VED: Date
    let to_VED: Date
    let from_DOI: Date
    let to_DOI: Date
    let query = {}
    let sorter = {}
    if(typeof  measuringDevice.VED_from  == 'object' || typeof measuringDevice.VED_to == 'object') {
      return []
    }
    if(typeof  measuringDevice.DOI_from  == 'object' || typeof measuringDevice.DOI_to == 'object') {
      return []
    }
    if (typeof measuringDevice.DOI_from === 'string') {
      const date: Date = new Date(measuringDevice.DOI_from);
      from_DOI = date
    }
    if (typeof measuringDevice.DOI_to === 'string') {
    const date: Date = new Date(measuringDevice.DOI_to);
    to_DOI = date
    }
    if (typeof measuringDevice.VED_from === 'string') {
      const date: Date = new Date(measuringDevice.VED_from);
      from_VED = date
      // console.log(date,'from_VED')
    }
    if (typeof measuringDevice.VED_to === 'string') {
    const date: Date = new Date(measuringDevice.VED_to);
    to_VED = date
    // console.log(date,'to_VED')
    }
    if(measuringDevice.DOI_from && measuringDevice.DOI_to) {
      query['dateOfIssue'] = BetweenDates(from_DOI, to_DOI)
    }
    if(measuringDevice.VED_from && measuringDevice.VED_to) {
      query['verificationEndDate'] = BetweenDates(from_VED, to_VED)
    }
    if(measuringDevice.factoryNumber) {
      query['factoryNumber'] = Like(`%${measuringDevice.factoryNumber}%`)
    }
    if(measuringDevice.note) {
      query['note'] = Like(`%${measuringDevice.note}%`)
    }
    if(measuringDevice.userName) {
      query['userName'] = Like(`%${measuringDevice.userName}%`)
    }
    if(measuringDevice.inventoryName) {
      query['inventoryName'] = Like(`%${measuringDevice.inventoryName}%`)
    }
    if(measuringDevice.deviceName) {
      query['deviceName'] = Like(`%${measuringDevice.deviceName}%`)
    }
    if(measuringDevice.deviceModel) {
      query['deviceModel'] = Like(`%${measuringDevice.deviceModel}%`)
    }
    if(measuringDevice.haveMetal) {
      query['haveMetal'] = In(measuringDevice.haveMetal)
    }
    if(measuringDevice.deviceType) {
      query['deviceType'] = {};
      // для фильтра по пустым данным, где нет информации о типе, 
      //нужно добавить в инструмент булево значение
      // что если deviceType пустой, то haveType = false, если есть = true
      query['deviceType'].value = In(measuringDevice.deviceType) 
    }

    // нужна доработка, даты типа string, для правильном сортировки
    //  нужно преобразовывать в тип даты
    if(!measuringDevice.sorterDateOfIssue && !measuringDevice.sorterVerificationEndDate) {
      console.log('DESC WORK')
          sorter['created_at'] = "DESC"
    }
    if(measuringDevice.sorterDateOfIssue) {
      sorter['dateOfIssue'] = measuringDevice.sorterDateOfIssue
    }
    if(measuringDevice.sorterVerificationEndDate) {
      sorter['verificationEndDate'] = measuringDevice.sorterVerificationEndDate
    }


  let data = this.deviceRepository.findAndCount({
    where: {
      ...query,
    },    
    take: 10,
    skip: skip,
    order: {
      ...sorter
    },
    relations: {
      deviceType: true
    }
  });

  query = {}
    return data
  }


  async findAlldateOfIssue(measuringDevice: FiltersProps): Promise<any> {

    if(measuringDevice.page < 1) measuringDevice.page = 1
    const skip = (measuringDevice.page - 1) * 10 || 0

    // console.log(measuringDevice)
    let from: Date
    let to: Date
    let order = {}
  if(measuringDevice.orderDateOfIssue) {
    order['dateOfIssue'] = measuringDevice.orderDateOfIssue
  }
    if(typeof  measuringDevice.DOI_from  == 'object' || typeof measuringDevice.DOI_to == 'object') {
      return []
    }
    if (typeof measuringDevice.DOI_from === 'string') {
      const date: Date = new Date(measuringDevice.DOI_from);
      from = date
  }
  if (typeof measuringDevice.DOI_to === 'string') {
    const date: Date = new Date(measuringDevice.DOI_to);
    to = date
}
    return this.deviceRepository.findAndCount({
      where: {
        dateOfIssue: BetweenDates(from, to),
        deleted: false
      }, skip, 
      order: {...order}
    });
  }
  async findAllVerificationEndDate(measuringDevice: FiltersProps): Promise<any> {

    if(measuringDevice.page < 1) measuringDevice.page = 1
    const skip = (measuringDevice.page - 1) * 10 || 0

    console.log(measuringDevice)
    let from: Date
    let to: Date
    if (typeof measuringDevice.VED_from === 'string') {
      const date: Date = new Date(measuringDevice.VED_from);
      from = date
  }
  if (typeof measuringDevice.VED_to === 'string') {
    const date: Date = new Date(measuringDevice.VED_to);
    to = date
}
let order = {}
if(measuringDevice.verificationEndDate) {
  order['verificationEndDate'] = measuringDevice.verificationEndDate
}
    return this.deviceRepository.findAndCount({
      where: {
        verificationEndDate: BetweenDates(from, to),
        deleted: false
      },skip,
      order: {
        ...order
      }
    });
  }






  async findOne(id: string): Promise<any> {
    return this.deviceRepository.findOne({where: {id,deleted: false}, relations: {
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
    const entityToDelete = await this.deviceRepository.findOne({where: {id,deleted: false},relations: {files: true}});

    if (!entityToDelete) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return this.deviceRepository.save({...entityToDelete, deleted: true});
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
    return this.typeRepository.findOne({where: {value: id},});
  }
  async find(): Promise<any> {
    return this.typeRepository.find();
  }
}