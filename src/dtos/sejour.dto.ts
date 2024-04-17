import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from "src/user/user.entity";

export class SejourDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsDate()
    @IsNotEmpty()
    dateEntree: Date;

    @IsDate()
    @IsNotEmpty()
    dateSortie: Date;

    @IsString()
    @IsNotEmpty()
    @Length(5)
    motif: string;

    @IsString()
    @IsNotEmpty()
    @Length(5)
    specialite: string;

    @IsString()
    medecin: string;

    @IsString()
    user: User;

}