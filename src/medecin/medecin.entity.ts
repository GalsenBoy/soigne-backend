import { Avis } from "../avis/avis.entity";
import { Sejour } from "../sejour/sejour.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Medecin {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    specialite: string;

    @Column({ unique: true })
    matricule: string;

    @OneToMany(() => Sejour, (sejour) => sejour.medecin)
    sejours?: Sejour[];

    @OneToMany(() => Avis, (avis) => avis.medecin)
    avis?: Avis[];

}