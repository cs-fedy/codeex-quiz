export type UploadFileArgs = {
  dataBuffer: Buffer
  fileName: string
}

export interface IFileService {
  uploadFile(args: UploadFileArgs): Promise<string>
}
