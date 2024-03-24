import { IsNotEmpty, IsString } from "class-validator";

export class MedecinLoginDto {
    @IsString()
    @IsNotEmpty()
    matricule: {
        matricule: string;
    };
}
