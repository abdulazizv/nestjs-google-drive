import { IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @IsOptional()
    @IsString()
    readonly originalName: string;

    @IsMongoId()
    @IsString()
    readonly folderId: string;

}
