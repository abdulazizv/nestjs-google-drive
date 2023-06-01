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
        endPoint: 'localhost',
        port: 9000,
        useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
        accessKey: 'ojiZYKW8sbb6mCmSBvE4',
        secretKey: 'ULcl0fuzCRN7PU91VIbnrjtX4h69uI0Mm7qnywhX'
    })

  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}