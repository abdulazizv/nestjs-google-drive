import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { ApiFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('folders')
@ApiTags('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @ApiOperation({summary:"Create new folder"})
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFolderDto: CreateFolderDto,@Req() req:Request) {
    return this.foldersService.create(createFolderDto,req);
  }

  @ApiOperation({summary:'Get all folders'})
  @ApiFoundResponse()
  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @ApiOperation({summary:"Get folder by user_id"})
  @ApiFoundResponse()
  @Get('by-user/:id')
  findAllById(@Param('id') id: string) {
    return this.foldersService.findAllFolderById(id);
  }

  @ApiOperation({summary:'Get file by Id'})
  @ApiFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foldersService.findOne(id);
  }

  @ApiOperation({summary:"Update file by id"})
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(id, updateFolderDto);
  }

  @ApiOperation({summary:'Delete file by id'})
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foldersService.remove(id);
  }
}
