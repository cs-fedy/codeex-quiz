import {
  Controller,
  Inject,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import filePipeValidator from 'src/pipes/filePipeValidator'
import { Routes, Services, imagesMimeTypeRegex, oneMegabyte } from 'src/utils/constants'
import { IFileService } from './IFile'

@Controller(Routes.files)
export class FileController {
  constructor(@Inject(Services.file) private fileService: IFileService) {}

  @Post(Routes.image)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: filePipeValidator({
          fileType: imagesMimeTypeRegex,
          maxSize: oneMegabyte,
        }),
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.fileService.uploadFile({
      dataBuffer: file.buffer,
      fileName: file.filename,
    })

    return { fileUrl: uploadedFile }
  }
}
