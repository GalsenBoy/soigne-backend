import { Prescription } from "src/prescription/prescription.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medecament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    medicament: string;

    @Column()
    posologie: string;

    @ManyToOne(() => Prescription, (prescription) => prescription.medecament)
    prescription: Prescription
}