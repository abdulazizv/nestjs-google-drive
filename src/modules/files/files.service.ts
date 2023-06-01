import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
// import { BufferedFile } from '../../shared/minio-client/file.model';

@Injectable()
export class FilesService {
  // constructor(private readonly minioClientService: MinioClientService){}
  async create(createFileDto: CreateFileDto,file:string) {
      // const uploadVideo = await this.minioClientService.upload(file);
      // console.log(uploadVideo);
      return "OK"
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
