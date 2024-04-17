import { Medecament } from "../medecaments/medecament.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToMany(() => Medecament, (medecament) => medecament.prescription, { cascade: true })
    medecament: Medecament[];
}