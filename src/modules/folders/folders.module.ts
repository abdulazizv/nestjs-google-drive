import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports:[PrismaModule,JwtModule.register({}),FilesModule],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
