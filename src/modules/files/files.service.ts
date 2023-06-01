import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { BufferedFile } from '../../shared/minio-client/file.model';
import { MinioClientService } from '../../shared/minio-client/minio-client.service';
import { RequestUser } from '../../types';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private readonly minioClientService: MinioClientService,
    private prismaService: PrismaService){}

  async create(createFileDto: CreateFileDto,file:BufferedFile,req:any) {
    const uploadFile = await this.minioClientService.upload(file);
      const newFile = await this.prismaService.drives.create({
        data:{
          mimetype: uploadFile.file.mimetype,
          originalName: createFileDto.originalName || uploadFile.file.originalname,
          location_id: uploadFile.url,
          userId:req.user.id,
          folderId:createFileDto.folderId

        }
      })
      return {
        status:"OK",
        data:newFile
      }
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
