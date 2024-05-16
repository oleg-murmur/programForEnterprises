import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ nullable: true })
    fullName: string

    
    @Column({unique: true})
    email: string

    
    @Column()
    password: string 

    @Column({ default: false}) 
    deleted: boolean
    
    @Column({ nullable: true,length: 255 })
    token: string;
    @Column({ default: 'employee'})
    role: 'admin' | 'employee' | 'editor' ;
}


