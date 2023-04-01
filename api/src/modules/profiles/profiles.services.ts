import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import IHash from 'src/services/hashing'
import { Events, Mappers, Repos, Services } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IUsersRepo from '../users/i-users.repository'
import User from '../users/users.domain'
import UserDTO from '../users/users.dto'
import IProfileEvents from './i-profiles.events'
import IProfileService, {
  UpdateCredentialsResult,
  UpdateEmailArgs,
  UpdatePasswordArgs,
  UpdateProfileArgs,
  UpdateProfileResult,
} from './i-profiles.services'

@Injectable()
export default class ProfileService implements IProfileService {
  constructor(
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
    @Inject(Services.hash) private hashService: IHash,
    @Inject(Events.profile) private profileEvents: IProfileEvents,
  ) {}

  async updateProfile(args: UpdateProfileArgs): Promise<UpdateProfileResult> {
    const existingUser = await this.userRepository.getUserById(args.userId)
    if (!existingUser) return Left.create(null)

    const newUser = { ...existingUser, ...args }
    await this.userRepository.saveUser(newUser)

    const mappedUser = this.userMapper.toDTO(newUser)
    return Right.create(mappedUser)
  }

  async updateEmail(args: UpdateEmailArgs): Promise<UpdateCredentialsResult> {
    const existingUser = await this.userRepository.getUserById(args.userId)
    if (!existingUser)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials',
      })

    const isValidPassword = await this.hashService.compare(args.userPassword, existingUser.password)

    if (!isValidPassword)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials',
      })

    const updatedUser = await this.userRepository.saveUser({
      ...existingUser,
      email: args.newEmail,
    })

    await this.profileEvents.newEmailUpdated({
      oldEmail: existingUser.email,
      newEmail: updatedUser.email,
      userId: existingUser.userId,
    })

    const mappedUser = this.userMapper.toDTO(updatedUser)
    return Right.create(mappedUser)
  }

  async updatePassword(args: UpdatePasswordArgs): Promise<UpdateCredentialsResult> {
    const existingUser = await this.userRepository.getUserById(args.userId)
    if (!existingUser)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials',
      })

    const isValidPassword = await this.hashService.compare(args.userPassword, existingUser.password)
    if (!isValidPassword)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials',
      })

    const updatedUser = await this.userRepository.saveUser({
      ...existingUser,
      password: await this.hashService.hash(args.newPassword),
    })

    await this.profileEvents.newPasswordUpdated({ userId: existingUser.userId })
    const mappedUser = this.userMapper.toDTO(updatedUser)
    return Right.create(mappedUser)
  }
}
