import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import IHash from 'src/services/hashing'
import { Mappers, Repositories, Roles, Services, defaultAvatar } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generateId'
import IUserRepo from './IUser.repository'
import IUserService, { CreateUserArgs, CreateUserResult } from './IUser.services'
import User from './user.domain'
import UserDTO from './user.dto'

@Injectable()
export default class UserService implements IUserService {
  constructor(
    @Inject(Repositories.user) private userRepository: IUserRepo,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
    @Inject(Services.hash) private hashService: IHash,
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

    const newUser = await this.userFactory(args)
    const createdUser = await this.userRepository.createUser(newUser)
    const mappedUser = this.userMapper.toDTO(createdUser)
    return Right.create(mappedUser)
  }

  async userFactory(args: CreateUserArgs): Promise<User> {
    return {
      ...args,
      userId: generateId(),
      password: await this.hashService.hash(args.password),
      avatarURL: defaultAvatar,
      roles: [Roles.user],
    }
  }
}
