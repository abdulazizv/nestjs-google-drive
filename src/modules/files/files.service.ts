import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { BufferedFile } from '../../shared/minio-client/file.model';
import { MinioClientService } from '../../shared/minio-client/minio-client.service';
import { RequestUser } from '../../types';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class FilesService {
  constructor(private readonly minioClientService: MinioClientService,
    private prismaService: PrismaService){}

  async create(createFileDto: CreateFileDto,file:BufferedFile,req:any) {
    const uploadFile = await this.minioClientService.upload(file);
      const newFile = await this.prismaService.drives.create({
        data:{
          mimetype: file.mimetype,
          originalName: createFileDto.originalName || file.originalname,
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

  async getFile(filename:string,res:Response) {
    try {
      const fileStream = await this.minioClientService.getFileStream(filename);

      res.setHeader('Content-Type', 'multipart/form-data'); // Maybe we should delete this line
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      // Pipe the file stream to the response
      fileStream.pipe(res);
    } catch (error) {
      // Handle errors appropriately
      res.status(500).send('Error retrieving file');
    }
  }
  async findAll() {
    const allFiles = await this.prismaService.drives.findMany({
      include:{
        user: true,
        sharedDrives: true
      }
    })
    if(allFiles.length < 1) {
      throw new HttpException(
        'Files not found',
        HttpStatus.NO_CONTENT
      )
    }
    return allFiles;
  }

  async getByLocationId(filename:string) {
    filename = `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${filename}`;
    const data = await this.prismaService.drives.findFirst({
      where:{
        location_id: filename
      },include:{
        user:true,
        sharedDrives:true
      }
    })
    if(!data) {
      return false
    }
    return data;
  }
  async findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
