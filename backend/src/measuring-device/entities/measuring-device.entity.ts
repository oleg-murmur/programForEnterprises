import { UUID } from "crypto";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MeasuringInstrumentType } from "./measuringInstrumentType.entity";
import { FilesOfDevices } from "./filesInstrument.entity";


@Entity({name: 'measuringDevices'})
export class MeasuringDevice {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    //инвантарный номер
    @Column({ nullable: true })
    inventoryName: string

    //заводской номер
    @Column({ nullable: true })
    factoryNumber: string

    //пользователь прибора
    @Column({ nullable: true })
    userName: string // кто отвечает за прибор (отдельная сущность?)

    @Column({ type: 'date',nullable: true })
    dateOfIssue: string; // Дата выпуска

    @Column({ nullable: true })
    note: string; // Примечание

    @Column({ type: 'date',nullable: true })
    verificationEndDate: string; // Дата окончания поверки

    @Column({ nullable: true }) //наличие драг. металлов
    haveMetal: 'Да' | 'Нет информации' | 'Нет'
    
    @ManyToOne(() => MeasuringInstrumentType, (device)=> device.masuringDevice)
    deviceType: MeasuringInstrumentType

    @OneToMany(() => FilesOfDevices, (file) => file.device, { onDelete: 'CASCADE' })
    files: FilesOfDevices[]
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
    // @ManyToOne(() => MeasuringInstrumentType, type => type.measuringDevices)
    // type: MeasuringInstrumentType; // Тип измерительного прибора
}
    //  наличие драг металлов
    /* 
      //  тип средства измерения (связь один ко многим)
      //  
       // заводской номер
       // пользователь
       // дата выдачи
       // примечание
       // дата окончания поверки
      //  место поверки предприятие
     //   номер гос.реестра
      //  бухгалтерский учет

    
    */

