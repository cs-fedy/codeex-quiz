import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import IHash from 'src/services/hashing'
import { Events, Mappers, Repos, Roles, Services, defaultAvatar } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateId from 'src/utils/generateId'
import IUserService, { CreateUserArgs, CreateUserResult, GetUserResult } from './IUser.services'
import IUserEvents from './IUsers.events'
import IUserRepo from './IUsers.repository'
import User from './users.domain'
import UserDTO from './users.dto'

@Injectable()
export default class UserService implements IUserService {
  constructor(
    @Inject(Repos.user) private userRepository: IUserRepo,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
    @Inject(Services.hash) private hashService: IHash,
    @Inject(Events.user) private userEvents: IUserEvents,
  ) {}

  async createUser(args: CreateUserArgs): Promise<CreateUserResult> {
    const [userByEmail, userByPassword] = await Promise.all([
      this.userRepository.getUserByEmail(args.email),
      this.userRepository.getUserByUsername(args.username),
    ])

    if (userByEmail || userByPassword)
      return Left.create({
        status: HttpStatus.CONFLICT,
        code: 'taken_credentials',
        message: 'email already taken',
      })

    const newUser = await this.userFactory(args)
    const createdUser = await this.userRepository.saveUser(newUser)

    await this.userEvents.newUserExist({
      userId: newUser.userId,
    })

    const mappedUser = this.userMapper.toDTO(createdUser)
    return Right.create(mappedUser)
  }

  async userFactory(args: CreateUserArgs): Promise<User> {
    return {
      ...args,
      userId: generateId(),
      password: await this.hashService.hash(args.password),
      roles: [Roles.user, Roles.self],
      avatarURL: defaultAvatar,
      isConfirmed: false,
    }
  }

  async getUser(userId: string): Promise<GetUserResult> {
    const existingUser = await this.userRepository.getUserById(userId)
    if (!existingUser)
      return Left.create({
        code: 'user_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
      })

    const fetchedUser = this.userMapper.toDTO(existingUser)
    return Right.create(fetchedUser)
  }
}
