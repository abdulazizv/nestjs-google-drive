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
  Query,
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
import { sharedDrivesDto } from './dto/create-sharedDrives.dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({summary:'To create file, But this operation need to run from postman'})
  @ApiResponse({status:201})
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
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

  @ApiOperation({summary:'Endpoint for "Скачать", but this operation need to just new browser tab'})
  @ApiResponse({status:200})
  // @UseGuards(checkGuard)
  @Get('/download-file/:fileid')
  async downloadFile(@Param('fileid') id:string,@Res() res:Response){
      return this.filesService.getFile(id,res);
  }

  @ApiOperation({summary:'Get all files'})
  @ApiResponse({status:200})
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @ApiOperation({summary:'Get all files by user_id'})
  @ApiResponse({status:200})
  @Get('all/:id')
  async getAllByUser(@Param('id') id: string) {
    return this.filesService.findAllByUserId(id);
  }

  @ApiOperation({summary:'Get file by folder'})
  @ApiResponse({status:200})
  @Get('folder/:id')
  getFilesByFolder(@Param('id') id: string) {
    return this.filesService.getFilesByFolder(id);
  }

  @ApiOperation({summary:'Get files by mimetype'})
  @ApiResponse({status:200})
  @ApiQuery({})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // this guard helps us to handle user.id and we can search with user.id and mimetype
  @Get('search')
  getFilesByMimeType(@Query('mimetype') mimetype: string,@Req() req:RequestUser) {
    return this.filesService.getFilesByMimeType(mimetype,req);
  }

  @ApiOperation({summary:'Get file by file_name'})
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(checkGuard)
  @Get('location/:id')
  findById(@Param('id') id: string) {
    return this.filesService.getByLocationId(id);
  }

  @ApiOperation({summary:'Get file by id'})
  @ApiResponse({status:200})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }


  @ApiOperation({summary:'Share information with other'})
  @ApiOkResponse()
  @Post('share')
  shareInformation(@Body() sharedDrivesDto: sharedDrivesDto) {
    return this.filesService.shareFileWithEmail(sharedDrivesDto);
  }

  @ApiOperation({summary:'Update information'})
  @ApiResponse({status:200}) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @ApiOperation({summary:'Delete file'})
  @ApiResponse({status:200})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
