import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({example:'Readable',description:'This table contains two datas, First id is can write and read, second id only can read'})
    @IsOptional()
    @IsString()
    readonly name:string;
}
