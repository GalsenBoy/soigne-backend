import { Sejour } from 'src/sejour/sejour.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';

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

    @OneToMany(() => Sejour, (sejour) => sejour.user)
    sejours: Sejour[]
}