import { HttpStatus } from '@nestjs/common'

export type UserNotFound = {
  status: HttpStatus.NOT_FOUND
  code: 'user_not_found'
  message: string
}
