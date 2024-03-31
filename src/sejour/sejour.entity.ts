import { Avis } from "src/avis/avis.entity";
import { Medecin } from "src/medecin/medecin.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sejour {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'date' })
    dateEntree: Date;

    @Column({ type: 'date' })
    dateSortie: Date;

    @Column()
    motif: string;

    @Column()
    specialite: string;

    @ManyToOne(() => User, (user) => user.sejours)
    user: User

    @ManyToOne(() => Medecin, (medecin) => medecin.sejours)
    medecin: Medecin;

    @OneToMany(() => Avis, (avis) => avis.sejour)
    avis: Avis[];

}