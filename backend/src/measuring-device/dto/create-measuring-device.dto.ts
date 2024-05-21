
import { Generated } from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class CreateMeasuringDeviceDto {
    @Generated("uuid")
    id: string;

    //инвантарный номер
    inventoryName: string

    //заводской номер
    factoryNumber: string

    //пользователь прибора
    userName: string // кто отвечает за прибор (отдельная сущность?)

    dateOfIssue: Date; // Дата выпуска

    note: string; // Примечание

    verificationEndDate: Date; // Дата окончания поверки

    //наличие драг. металлов
    haveMetal: 'Да' | 'Нет информации' | 'Нет'
    
    type: number; // Тип измерительного прибора
    deviceName: string;
    deviceModel: string;

}

export class CreateTypeDto {
    value: number;
    name: string;
}