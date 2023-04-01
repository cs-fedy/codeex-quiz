import { BadRequestException, ParseFilePipeBuilder } from '@nestjs/common'

type FilePipeValidatorArgs = {
  fileType: string | RegExp
  maxSize: number
}

const filePipeValidator = ({ fileType, maxSize }: FilePipeValidatorArgs) => {
  const validators = new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType })
    .addMaxSizeValidator({ maxSize })
    .build({
      exceptionFactory: (error) => {
        throw new BadRequestException({
          code: 'invalid_file',
          message: error,
        })
      },
    })
    .getValidators()

  return validators
}

export default filePipeValidator
