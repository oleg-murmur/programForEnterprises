import { UUID } from "crypto";
import { MeasuringDevice } from "src/measuring-device/entities/measuring-device.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



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

    //пользователь прибора
    @Column({ nullable: true })
    date: string // дата загрузки

  

    @ManyToOne(() => MeasuringDevice, (device)=> device.files)
    device: MeasuringDevice
}

