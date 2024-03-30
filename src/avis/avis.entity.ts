import { Medecin } from 'src/medecin/medecin.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avis {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    description: string;

    @ManyToOne(() => Medecin, (medecin) => medecin.avis)
    medecin: Medecin;

    @ManyToOne(() => User, (user) => user.avis)
    user: User;
}
