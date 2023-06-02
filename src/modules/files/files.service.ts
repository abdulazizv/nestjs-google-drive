import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { BufferedFile } from '../../shared/minio-client/file.model';
import { MinioClientService } from '../../shared/minio-client/minio-client.service';
import { RequestUser } from '../../types';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Response } from 'express';
import { sharedDrivesDto } from './dto/create-sharedDrives.dto';

@Injectable()
export class FilesService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private prismaService: PrismaService,
  ) {}

  async create(createFileDto: CreateFileDto, file: BufferedFile, req: any) {
    const uploadFile = await this.minioClientService.upload(file);
    const newFile = await this.prismaService.drives.create({
      data: {
        mimetype: file.mimetype,
        originalName: createFileDto.originalName || file.originalname,
        location_id: uploadFile.url,
        userId: req.user.id,
        folderId: createFileDto.folderId,
      },
    });
    return {
      status: 'OK',
      data: newFile,
    };
  }

  async getFile(filename: string, res: Response) {
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
      include: {
        user: true,
        sharedDrives: true,
      },
    });
    if (allFiles.length < 1) {
      throw new HttpException('Files not found', HttpStatus.NO_CONTENT);
    }
    return allFiles;
  }

  async getByLocationId(filename: string) {
    try {
      filename = `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${filename}`;
      const data = await this.prismaService.drives.findFirst({
        where: {
          location_id: filename,
        },
        include: {
          user: true,
          sharedDrives: true,
        },
      });
      if (!data) {
        return false;
      }
      return data;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException({
        message: 'Unexpected Error',
      });
    }
  }

  async findOne(id: string) {
    try {
      const datas = await this.prismaService.drives.findUnique({
        where: {
          id,
        },
      });
      if (!datas) {
        throw new NotFoundException({
          message: 'ID is not correct, File not found',
        });
      }
      return datas;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException({
        message: 'Unexpected Error',
      });
    }
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    try {
      const updatedFile = await this.prismaService.drives.update({
        where: {
          id,
        },
        data: { ...updateFileDto },
      });
      return {
        status: 'Ok',
        data: updatedFile,
      };
    } catch (error) {
      throw new BadGatewayException({
        message: 'Unexpected error on update method',
      });
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.drives.delete({
        where: {
          id,
        },
      });
      return {
        status: 'OK',
        message: 'Successfully deleted',
      };
    } catch (error) {
      throw new BadGatewayException({
        message: 'Unexpected error',
      });
    }
  }

  async shareFileToAll(id: string) {
    try {
      const updatedFile = await this.prismaService.drives.update({
        where: {
          id,
        },
        data: {
          is_openToAll: true,
        },
      });
      return {
        status: 'OK',
        message: `${updatedFile.location_id} file is open everyone now !`,
      };
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async shareFileWithEmail(sharedDrivesDto: sharedDrivesDto) {
    try {
      const { email, filename, role_id } = sharedDrivesDto;
      const data = await this.getByLocationId(filename);
      if (!data) {
        throw new NotFoundException({
          message: 'Filename is incorrect',
        });
      }
      const sharedDrive = await this.prismaService.sharedDrives.create({
        data: {
          drive_id: data.id,
          email,
          role_id,
        },
      });

      return {
        status: 'OK, This information shared',
        resp: sharedDrive,
      };
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }

  async getFilesByFolder(folder: string) {
    try {
      const filesByFolder = await this.prismaService.drives.findMany({
        where: {
          folderId: folder,
        },
      });
      if (!filesByFolder) {
        throw new NotFoundException({
          message: 'File not found in this folder',
        });
      }
      return filesByFolder;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException();
    }
  }

  async getFilesByMimeType(mimetype: string) {
    try {
      const mimetypeFiles = await this.prismaService.drives.findMany({
        where: {
          mimetype,
        },
      });
      if (!mimetypeFiles) {
        throw new NotFoundException({
          message: 'Files not found according to this mimetype',
        });
      }
      return mimetypeFiles;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException({
        message: 'Server error on getting datas with mimetype',
      });
    }
  }
}
