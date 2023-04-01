import {
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import filePipeValidator from 'src/pipes/file-pipe-validator'
import { Roles, Routes, Services, imagesMimeTypeRegex, oneMegabyte } from 'src/utils/constants'
import { IFileService } from './IFile'

@Controller(Routes.files)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.self))
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
    @Res() res: Response,
  ) {
    const uploadedFile = await this.fileService.uploadFile({
      dataBuffer: file.buffer,
      fileName: file.filename,
    })

    return res.status(HttpStatus.CREATED).json({ fileUrl: uploadedFile })
  }
}
