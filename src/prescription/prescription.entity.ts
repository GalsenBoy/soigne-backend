import { Avis } from "src/avis/avis.entity";
import { Medecament } from "src/medecaments/medecament.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @OneToMany(() => Medecament, (medecament) => medecament.prescription, { cascade: true })
    medecament: Medecament[];
}