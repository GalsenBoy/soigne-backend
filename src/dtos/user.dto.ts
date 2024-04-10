import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { Role } from "src/roles/role.enum";

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

    @IsString()
    @IsNotEmpty()
    zipCode: string;
}