import { IsMongoId, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateFileDto {
    @ApiProperty({example:'lesson 3',description:'originalname is optional, if orinalname is undefined, database save name which returned from minio'})
    @IsOptional()
    @IsString()
    readonly originalName: string;

    @ApiProperty({example:'64e3ffnjafejbxqwr09e4',description:'id of folder which file is located'})
    @IsMongoId()
    @IsString()
    readonly folderId: string;

}
