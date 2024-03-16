import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.entity";

export class SejourDto {
    @IsDate()
    @IsNotEmpty()
    dateEntree: Date;

    @IsDate()
    @IsNotEmpty()
    dateSortie: Date;

    @IsString()
    @IsNotEmpty()
    motif: string;

    @IsString()
    @IsNotEmpty()
    speciality: string;

    @IsString()
    @IsNotEmpty()
    medecin: string;

    @IsString()
    @IsNotEmpty()
    user: User;

}