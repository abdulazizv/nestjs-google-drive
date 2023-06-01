import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { FoldersModule } from './modules/folders/folders.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [UsersModule,FilesModule,FoldersModule,RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
