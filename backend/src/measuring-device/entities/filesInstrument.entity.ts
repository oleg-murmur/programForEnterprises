import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MeasuringInstrumentType } from "./measuringInstrumentType.entity";
import { MeasuringDevice } from "./measuring-device.entity";


@Entity({name: 'filesOfDevices'})
export class FilesOfDevices {
    @PrimaryGeneratedColumn("uuid")
    uid: string;
    //инвантарный номер
    @Column({ nullable: true })
    name: string

    //заводской номер
    @Column({ nullable: true })
    url: string

    @ManyToOne(() => MeasuringDevice, (device)=> device.files)
    device: MeasuringDevice
}

    //пользователь прибора
    // @Column({ nullable: true })
    // date: string // дата загрузки

  

