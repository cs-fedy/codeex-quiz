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

export type QuizNotFound = {
  status: HttpStatus.NOT_FOUND
  code: 'quiz_not_found'
  message: string
}

export type CollectionNotFound = {
  status: HttpStatus.NOT_FOUND
  code: 'collection_not_found'
  message: string
}

export type QuizNotAvailable = {
  status: HttpStatus.BAD_REQUEST
  code: 'quiz_not_available'
  message: string
}

export type NotCollectionOwner = {
  status: HttpStatus.FORBIDDEN
  code: 'not_collection_owner'
  message: string
}

export type CollectionQuizExist = {
  status: HttpStatus.CONFLICT
  code: 'collection_quiz_exist'
  message: string
}

export type CollectionNotAvailable = {
  code: 'collection_not_available'
  status: HttpStatus.BAD_REQUEST
  message: string
}

export type NotificationNotFound = {
  code: 'notification_not_found'
  status: HttpStatus.NOT_FOUND
  message: string
}
