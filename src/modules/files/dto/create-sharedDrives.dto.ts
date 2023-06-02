import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class sharedDrivesDto {
    @ApiProperty({example:'filename.mp4',description:'There need to write filename which minio returned which need to be share i'})
    @IsString()
    readonly filename:string;

    @ApiProperty({example:'filename.mp3',description:'There need to write email'})
    @IsString()
    readonly email:string;

    @ApiProperty({example:'1 or 2',description:'There need to send 1 or 2, if 1 it can be write and red,if 2 it can be only read'})
    @IsString()
    readonly role_id: string;
}