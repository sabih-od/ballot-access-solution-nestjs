import { IsNotEmpty, IsString, IsEmail, Validate } from 'class-validator';

export class CreatePetitionDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}