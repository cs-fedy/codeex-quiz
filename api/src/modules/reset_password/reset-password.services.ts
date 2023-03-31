import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import * as moment from 'moment'
import IHash from 'src/services/hashing'
import { Events, Repos, Services, resetPasswordKey } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import generateRandomCode from 'src/utils/random-code'
import ICacheRepo from '../cache/i-cache.repository'
import IUsersRepo from '../users/i-users.repository'
import IResetPasswordEvents from './i-reset-password.events'
import IResetPasswordService, {
  RequestResetPasswordResult,
  ResetPasswordArgs,
  ResetPasswordResult,
} from './i-reset-password.services'

@Injectable()
export default class ResetPasswordService implements IResetPasswordService {
  constructor(
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Events.resetPassword)
    private resetPasswordEvents: IResetPasswordEvents,
    @Inject(Repos.cache) private cacheRepository: ICacheRepo<number>,
    @Inject(Services.hash) private hashService: IHash,
  ) {}

  async requestResetPassword(userEmail: string): Promise<RequestResetPasswordResult> {
    const existingUser = await this.userRepository.getUserByEmail(userEmail)
    if (!existingUser)
      return Left.create({
        status: HttpStatus.NOT_FOUND,
        code: 'user_not_found',
        message: 'user not found - invalid credentials',
      })

    const code = generateRandomCode(5)
    const expiresIn = moment().add(process.env.REQUEST_RESET_PASSWORD_EXPIRATION_MINUTES, 'm')

    await this.resetPasswordEvents.newResetPasswordRequest({
      userId: existingUser.userId,
      code,
      expiresIn: expiresIn.calendar(),
    })

    const key = `${resetPasswordKey}_${existingUser.userId}`
    await this.cacheRepository.push(key, code)

    return Right.create({
      resetPasswordRequest: { expiresIn: expiresIn.valueOf() },
    })
  }

  async resetPassword(args: ResetPasswordArgs): Promise<ResetPasswordResult> {
    const existingUser = await this.userRepository.getUserByEmail(args.email)
    if (!existingUser)
      return Left.create({
        code: 'user_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'user not found',
      })

    const key = `${resetPasswordKey}_${existingUser.userId}`
    const codePosition = await this.cacheRepository.search(key, args.code)
    if (codePosition < 0)
      return Left.create({
        code: 'invalid_operation',
        status: HttpStatus.BAD_REQUEST,
        message: 'invalid confirmation code',
      })

    const updatedUser = await this.userRepository.saveUser({
      ...existingUser,
      password: await this.hashService.hash(args.newPassword),
    })

    await this.resetPasswordEvents.newPasswordUpdated({
      userId: updatedUser.userId,
    })
    return Right.create({ success: true })
  }
}
