import { IsNotEmpty, IsString, IsEmail, Validate } from 'class-validator';
import { PasswordMatchesValidator } from 'src/validators/password-matches-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Validate(PasswordMatchesValidator, ['password'])
    confirmPassword: string;
}