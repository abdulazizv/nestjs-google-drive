import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsStrongPassword()
  readonly password: string;
}
