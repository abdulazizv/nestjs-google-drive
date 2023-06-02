import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '../../shared/minio-client/file.model';
import { RequestUser } from '../../types';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Response } from 'express';
import { checkGuard } from '../../common/guards/check.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createFileDto: CreateFileDto,
    @UploadedFile() file: BufferedFile,
    @Req() req: any,
  ) {
    return this.filesService.create(createFileDto, file,req);
  }

  @Get('/download-file/:fileid')
  async downloadFile(@Param('fileid') id:string,@Res() res:Response){
      return this.filesService.getFile(id,res);
  }
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @UseGuards(checkGuard)
  @Get('location/:id')
  findById(@Param('id') id: string) {
    return "Hello"
    // return this.filesService.getByLocationId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
