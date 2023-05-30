import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../../shared/utils/auth/auth.module';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
