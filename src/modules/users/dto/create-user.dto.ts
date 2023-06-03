import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({example:'example@gmail.com',description:'Email for register'})
  @IsString()
  @IsEmail()
  readonly email: string;
  @ApiProperty({example:'pswd11',description:'Password for register'})
  @IsString()
  readonly password: string;
}
