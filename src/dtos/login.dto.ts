import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class LoginDto {

    id: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;
}