import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import {MinioModule} from "nestjs-minio-client";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    // MinioModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     endPoint: 'localhost',
    //     port: Number(configService.get<number>('MINIO_PORT')),
    //     useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
    //     access_key: configService.get<string>('MINIO_ACCESS_KEY'),
    //     secret_key: configService.get<string>('MINIO_SECRET_KEY')
    //   }),
    //   inject: [ConfigService]
    // })
    MinioModule.register({
        endPoint: process.env.MINIO_ENDPOINT,
        port: 9000,
        useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY
    })

  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}