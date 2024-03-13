import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @Length(5, 5)
    @IsNotEmpty()
    zipCode: number;
}