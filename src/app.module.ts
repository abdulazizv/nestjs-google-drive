import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'modules/users/users.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [UsersModule,FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
