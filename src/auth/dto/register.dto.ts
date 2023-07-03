import { IsNotEmpty, IsString, IsEmail, Validate } from 'class-validator';
import { PasswordMatchesValidator } from 'src/validators/password-matches-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
  
  @IsNotEmpty()
  @IsString()
  age: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordMatchesValidator, ['password'])
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}