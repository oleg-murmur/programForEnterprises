import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {MeasuringDevice} from './measuring-device.entity'


@Entity('instrumentType')
export class MeasuringInstrumentType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string; // Наименование типа измерительного прибора

    @OneToMany(() => MeasuringDevice, (device) => device.deviceType)
    masuringDevice: MeasuringDevice[]
    // @OneToMany(() => MeasuringDevice, instrument => instrument.type)
    // measuringDevices: MeasuringDevice[]; 
    // Связь "один ко многим" с измерительными приборами
}