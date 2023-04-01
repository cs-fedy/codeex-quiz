import Either from 'src/utils/either'
import { InvalidOperation, UserNotFound } from 'src/utils/types'

type RequestResetPasswordPayload = {
  resetPasswordRequest: { expiresIn: number }
}
export type RequestResetPasswordResult = Either<UserNotFound, RequestResetPasswordPayload>

export type ResetPasswordArgs = {
  code: number
  newPassword: string
  email: string
}

type ResetPasswordPayload = { success: boolean }
export type ResetPasswordResult = Either<InvalidOperation | UserNotFound, ResetPasswordPayload>

export type CRPasswordTokenPayload = {
  userId: string
  roles: Array<string>
}

export default interface IResetPasswordService {
  requestResetPassword(userEmail: string): Promise<RequestResetPasswordResult>
  resetPassword(args: ResetPasswordArgs): Promise<ResetPasswordResult>
}
