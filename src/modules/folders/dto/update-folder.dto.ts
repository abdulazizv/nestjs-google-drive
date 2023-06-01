import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderDto } from './create-folder.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
    @ApiProperty({example:'Folder1',description:'name of folder'})
    @IsOptional()
    @IsString()
    readonly folder_name: string;
}
