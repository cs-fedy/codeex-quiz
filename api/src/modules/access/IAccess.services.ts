import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import AccessDTO from './access.dto'

export type InvalidExpiredToken = {
  status: HttpStatus.BAD_REQUEST
  code: 'invalid_token'
  message: string
}

export type VerifyTokenResult<T> = Either<InvalidExpiredToken, T>

export default interface IAccessService {
  generateToken(payload: any): Promise<AccessDTO>
  verifyToken<U extends object>(token: string): VerifyTokenResult<U>
}
