import { Avis } from 'src/avis/avis.entity';
import { Role } from 'src/roles/role.enum';
import { Sejour } from 'src/sejour/sejour.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    zipCode: string;

    @Column({
        type: 'enum',
        enum: Role,
        // default: [Role.User]
    })
    roles: Role[];

    @OneToMany(() => Sejour, (sejour) => sejour.user)
    sejours: Sejour[]

    @OneToOne(() => Avis, (avis) => avis.user)
    avis: Avis[]
}