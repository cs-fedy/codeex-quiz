import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import AccessDTO from '../access/access.dto'
import RefreshDTO from '../refresh/refresh.dto'

export type LoginArgs = {
  username: string
  password: string
}

type LoginTokens = {
  access: AccessDTO
  refresh: RefreshDTO
}

type InvalidCredentials = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_credentials'
  message: string
}

export type LoginResult = Either<InvalidCredentials, LoginTokens>

export type RefreshArgs = {
  refreshToken: string
}

export type InvalidRefreshToken = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_refresh_token'
  message: string
}

export type UserNotFound = {
  status: HttpStatus.NOT_FOUND
  code: 'user_not_found'
  message: string
}

export type RefreshResult = Either<InvalidRefreshToken | UserNotFound, LoginTokens>

export type LogoutArgs = {
  userId: string
  accessToken: string
  refreshToken: string
}

export type InternalError = {
  status: HttpStatus.INTERNAL_SERVER_ERROR
  code: 'internal_server_error'
  message: string
}

export type LogoutResult = Either<InternalError, { message: string }>

export default interface IAuthService {
  login(args: LoginArgs): Promise<LoginResult>
  logout(args: LogoutArgs): Promise<LogoutResult>
  refresh(args: RefreshArgs): Promise<RefreshResult>
}
