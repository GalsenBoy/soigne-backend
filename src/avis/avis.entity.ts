import { Medecin } from '../medecin/medecin.entity';
import { Prescription } from '../prescription/prescription.entity';
import { Sejour } from '../sejour/sejour.entity';
import { User } from '../user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avis {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ default: '0' })
    description: string;

    @ManyToOne(() => Medecin, (medecin) => medecin.avis)
    medecin: Medecin;

    @ManyToOne(() => User, (user) => user.avis)
    user: User;

    @ManyToOne(() => Sejour, (sejour) => sejour.avis)
    sejour: Sejour;

    @OneToOne(() => Prescription)
    @JoinColumn()
    prescription: Prescription;

}
