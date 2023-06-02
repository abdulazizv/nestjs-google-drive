import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
import { FilesService } from '../../modules/files/files.service';
  
  @Injectable()
  export class checkGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
      private readonly filesService:FilesService) {}
   async canActivate(
      context: ExecutionContext,
    ) {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      let verifiedToken: any;
      try {
        verifiedToken = this.jwtService.verify(token,{secret:process.env.ACCESS_TOKEN_KEY});
      } catch (error) {
        throw new UnauthorizedException({
          message: "У вас нет такого доступа",
        });
      }
      const drive = await this.filesService.getByLocationId(req.params.id);
      if(!drive) {
        throw new UnauthorizedException({
            message: "Такой файл не найден",
          });

      } else if(drive.is_openToAll){
            return true;
      }  
      else if(drive.userId != verifiedToken.id && drive.sharedDrives[0].email !== verifiedToken.email ) {
        console.log(drive.sharedDrives.includes(verifiedToken.email),"email",verifiedToken.email,"sharedDrives =>" ,drive.sharedDrives)
        throw new UnauthorizedException({
            message: "У вас нет разрешения на просмотр этого файла",
          });
      }
      
      return true;
    }
  }