import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({example:'example@gmail.com',description:'Email for signin'})
  @IsString()
  email: string;
  @ApiProperty({example:'epas$$om',description:'password for signin'})
  @IsString()
  password: string;
}
