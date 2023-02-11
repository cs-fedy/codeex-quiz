import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repositories, defaultAvatar } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generateId'
import IUserRepo from './IUser.repository'
import IUserService, {
  CreateUserArgs,
  CreateUserResult,
} from './IUser.services'
import User from './user.domain'
import UserDTO from './user.dto'

@Injectable()
export default class UserService implements IUserService {
  constructor(
    @Inject(Repositories.userRepository) private userRepository: IUserRepo,
    @Inject(Mappers.userMapper) private userMapper: IMapper<User, UserDTO>,
  ) {}

  async createUser(args: CreateUserArgs): Promise<CreateUserResult> {
    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      this.userRepository.getUserByEmail(args.email),
      this.userRepository.getUserByUsername(args.username),
    ])

    if (existingUserByEmail || existingUserByUsername)
      return Left.create({
        status: HttpStatus.CONFLICT,
        code: 'taken_credentials',
        message: 'email/username already taken',
      })

    const newUser = this.userFactory(args)
    const createdUser = await this.userRepository.createUser(newUser)
    // TODO: send an email to the user
    const mappedUser = this.userMapper.toDTO(createdUser)
    return Right.create(mappedUser)
  }

  userFactory(args: CreateUserArgs): User {
    return {
      ...args,
      avatarURL: defaultAvatar,
      roles: ['user'],
      userId: generateId(),
    }
  }
}
