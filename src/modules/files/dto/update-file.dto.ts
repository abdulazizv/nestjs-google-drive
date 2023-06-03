import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    @ApiProperty({example:'64e4fnbrt65jb09r4',description:'Id of folder'})
    @IsOptional()
    @IsString()
    readonly folderId: string;
}
