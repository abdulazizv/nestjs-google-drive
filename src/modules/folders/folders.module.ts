import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule,JwtModule.register({})],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
