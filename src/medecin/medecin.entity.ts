import { Avis } from "src/avis/avis.entity";
import { Sejour } from "src/sejour/sejour.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    sejours: Sejour[];

    @OneToMany(() => Avis, (avis) => avis.medecin)
    avis: Avis[];

}