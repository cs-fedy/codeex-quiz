import { HttpStatus } from '@nestjs/common'
import Either from 'src/utils/either'
import { UserNotFound } from 'src/utils/types'
import UserDTO from './user.dto'

export type CreateUserArgs = {
  email: string
  password: string
  fullName: string
  username: string
}

type UserAlreadyExist = {
  status: HttpStatus.CONFLICT
  code: 'taken_credentials'
  message: string
}

export type CreateUserResult = Either<UserAlreadyExist, UserDTO>
export type GetUserResult = Either<UserNotFound, UserDTO>

export default interface IUserService {
  createUser(args: CreateUserArgs): Promise<CreateUserResult>
  getUser(userId: string): Promise<GetUserResult>
}
