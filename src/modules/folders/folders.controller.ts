import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('folders')
@ApiTags('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFolderDto: CreateFolderDto,@Req() req:Request) {
    return this.foldersService.create(createFolderDto,req);
  }

  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @Get('by-user/:id')
  findAllById(@Param('id') id: string) {
    return this.foldersService.findAllFolderById(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foldersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foldersService.remove(id);
  }
}
