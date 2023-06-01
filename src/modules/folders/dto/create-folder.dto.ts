import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFolderDto {
    @ApiProperty({example:'Folder1',description:'name of folder'})
    @IsString()
    readonly folder_name: string;
}

