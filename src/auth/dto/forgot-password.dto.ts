import { IsNotEmpty, IsString, IsEmail, Validate } from 'class-validator';

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}