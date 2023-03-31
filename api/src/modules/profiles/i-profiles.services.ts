import Either from 'src/utils/either'
import { InvalidCredentials } from 'src/utils/types'
import UserDTO from '../users/users.dto'

export type UpdateProfileArgs = {
  userId: string
  fullName?: string
  avatarURL?: string
}

export type UpdateProfileResult = Either<null, UserDTO>

export type UpdateEmailArgs = {
  userId: string
  userPassword: string
  newEmail: string
}

export type UpdateCredentialsResult = Either<InvalidCredentials, UserDTO>

export type UpdatePasswordArgs = {
  userId: string
  userPassword: string
  newPassword: string
}

export default interface IProfileService {
  updateProfile(args: UpdateProfileArgs): Promise<UpdateProfileResult>
  updateEmail(args: UpdateEmailArgs): Promise<UpdateCredentialsResult>
  // TODO: update username
  updatePassword(args: UpdatePasswordArgs): Promise<UpdateCredentialsResult>
}
