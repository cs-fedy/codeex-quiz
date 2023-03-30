import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import * as crypto from 'crypto'
import { IFileService, UploadFileArgs } from './IFile'

@Injectable()
export class FileService implements IFileService {
  async uploadFile(args: UploadFileArgs): Promise<string> {
    const uploadResult = await this.uploadToS3(args.dataBuffer, args.fileName)
    return uploadResult.Location
  }

  private async uploadToS3(dataBuffer: Buffer, fileName: string) {
    const s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })

    // TODO: debug fileName is undefined
    return await s3
      .upload({
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: dataBuffer,
        Key: `${crypto.randomUUID()}-${fileName}`,
      })
      .promise()
  }
}
