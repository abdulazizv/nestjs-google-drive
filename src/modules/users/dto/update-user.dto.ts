import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './create-user.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @ApiProperty({example:'user@gmail.com',description:'email for update'})
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;
  @ApiProperty({example:'uspassword11',description:'password for update'})
  @IsOptional()
  @IsEmail()
  readonly password: string;
}
