import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example:'Writable',description:'This table contains two datas, First id is can write and read, second id only can read'})
    @IsString()
    readonly name: string;
}
