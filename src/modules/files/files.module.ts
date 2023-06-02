import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientModule } from '../../shared/minio-client/minio-client.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
  imports:[MinioClientModule,JwtModule.register({}),PrismaModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports:[FilesService]
})
export class FilesModule {}
