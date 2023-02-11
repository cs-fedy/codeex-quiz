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

export default interface IAuthService {
  login(args: LoginArgs): Promise<LoginResult>
}
