export interface BufferedFile {
  fildname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}


export interface HasFile {
  file: Buffer | string
}

export interface StoredFileMetadata{
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc: string;
}


export type AppMimeType = 'video/mp4' | 'image/jpeg' | 'application/pdf' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'text/plain' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'audio/mpeg' | 'audio.wav' | 'audio/mp3';