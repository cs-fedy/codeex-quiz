import { BadRequestException, ValidationPipeOptions } from '@nestjs/common'
import { ValidationError } from 'class-validator'

const getErrorPayload = (
  errors: Array<ValidationError>,
): Record<string, string | Record<string, string>> => {
  return errors.reduce((previous, current) => {
    if (current.children && current.children.length > 0)
      return {
        ...previous,
        [current.property]: getErrorPayload(current.children),
      }

    const constraints = current.constraints as object
    const firstItem = Object.entries(constraints).at(0)
    const value = firstItem ? firstItem[1] : ''
    return { ...previous, [current.property]: value }
  }, {})
}

const validationPipeOptions: ValidationPipeOptions = {
  stopAtFirstError: true,
  exceptionFactory: (errors) => {
    return new BadRequestException({
      code: 'invalid_input',
      payload: getErrorPayload(errors),
    })
  },
}

export default validationPipeOptions
