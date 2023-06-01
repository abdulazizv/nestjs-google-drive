import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class FoldersService {
  constructor(private prismaService: PrismaService) {}

  private async folderExists(id: string): Promise<boolean> {
    const folder = await this.prismaService.folders.findUnique({
      where: { id },
    });
    return !!folder;
  }

  async create(createFolderDto: CreateFolderDto,req:any) {
    const newFolder = await this.prismaService.folders.create({
      data: { 
        folder_name:createFolderDto.folder_name,
        user_id: req.user.id
      },
    });
    return newFolder;
  }

  async findAll() {
    const allFolders = await this.prismaService.folders.findMany({
      include: { drives: true,user:true },
    });
    if (allFolders.length < 1) {
      throw new NotFoundException('Folders not found');
    }
    return allFolders;
  }

  async findAllFolderById(user_id: string) {
    const allFoldersById = await this.prismaService.folders.findMany({
      where: { user_id },
    });
    if (allFoldersById.length < 1) {
      throw new NotFoundException('Folders not found, User.id is incorrect');
    }
    return allFoldersById;
  }

  async findOne(id: string) {
    const folder = await this.prismaService.folders.findUnique({
      where: { id },
    });
    if (!folder) {
      throw new NotFoundException('Folder not found, ID is incorrect');
    }
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto) {
    const exists = await this.folderExists(id);
    if (!exists) {
      throw new NotFoundException('Folder not found, ID is incorrect');
    }
    const updatedFolder = await this.prismaService.folders.update({
      where: { id },
      data: { ...updateFolderDto },
    });
    return updatedFolder;
  }

  async remove(id: string) {
    const exists = await this.folderExists(id);
    if (!exists) {
      throw new NotFoundException('Folder not found, ID is incorrect');
    }
    await this.prismaService.folders.delete({
      where: { id },
    });
    return {
      status: 'OK',
      message: 'Successfully deleted',
    };
  }
}
