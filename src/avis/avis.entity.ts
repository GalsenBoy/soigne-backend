import { Medecin } from 'src/medecin/medecin.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { Sejour } from 'src/sejour/sejour.entity';
import { User } from 'src/user/user.entity';
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
