import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './create-user.dto';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsEmail()
  readonly password: string;
}
