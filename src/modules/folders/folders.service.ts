import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { notFoundError } from '../../helpers/notFound.error';

@Injectable()
export class FoldersService {
  constructor(private prismaService:PrismaService){}

  async checkFolderByID(id: string) {
    const check = await this.prismaService.folders.findUnique({
      where:{
        id
      }
    });
    if(!check) return false
    return true
  }
  async create(createFolderDto: CreateFolderDto) {
    const newFolder = await this.prismaService.folders.create({data:{
      ...createFolderDto
    }});
    return newFolder;
  }

  async findAll() {
    const allFolders = await this.prismaService.folders.findMany({
      include:{
        drives: true
      }
    });
    if(allFolders.length < 1) {
      notFoundError('Folders not found')
    };
    return allFolders;
  }

  async findAllFolderById(user_id: string) {
    const allFolderById = await this.prismaService.folders.findMany({
      where:{
        user_id
      }
    });
    if(!allFolderById) {
      notFoundError('Folders not found, User.id is incorrect')
    }
    return allFolderById;
  }
  async findOne(id: string) {
    const oneFolder = await this.prismaService.folders.findUnique({
      where:{
        id
      }
    });
    if(!oneFolder) {
      notFoundError('Folder not found, ID is incorrect')
    }
    return oneFolder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto) {
    const check = await this.checkFolderByID(id);
    if(!check) {
      notFoundError('ID is incorrect')
    }
    const updatedFolder = await this.prismaService.folders.update({
      where:{
        id
      },data:{
        ...updateFolderDto
      }
    });
    return updatedFolder;
  }

  async remove(id: string) {
    const check = await this.checkFolderByID(id);
    if(!check){
      notFoundError('Error! ID is incorrect')
    }
    await this.prismaService.folders.delete({
      where:{
        id
      }
    });
    return {
      status:"OK",
      message:"Successfully deleted"
    }
  }
}
