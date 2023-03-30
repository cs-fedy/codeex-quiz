import { HttpStatus } from '@nestjs/common'

export type UserNotFound = {
  status: HttpStatus.NOT_FOUND
  code: 'user_not_found'
  message: string
}

export type ExpiredInvalidCode = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_expired_code'
  message: string
}

export type InvalidCredentials = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_credentials'
  message: string
}

export type InvalidOperation = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_operation'
  message: string
}
