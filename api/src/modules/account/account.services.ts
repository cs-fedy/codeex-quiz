import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import IUserRepo from 'src/modules/users/IUsers.repository'
import User from 'src/modules/users/users.domain'
import UserDTO from 'src/modules/users/users.dto'
import { Events, Mappers, Repos, confirmEmailKey } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import ICacheRepo from '../cache/ICache.repository'
import IAccountEvents from './iaccount.events'
import IAccountService, {
  ConfirmEmailArgs,
  ConfirmEmailResult,
  RequestConfirmEmailResult,
} from './iaccount.services'

@Injectable()
export default class AccountService implements IAccountService {
  constructor(
    @Inject(Repos.user) private userRepository: IUserRepo,
    @Inject(Mappers.user) private userMapper: IMapper<User, UserDTO>,
    @Inject(Events.accounts) private accountEvents: IAccountEvents,
    @Inject(Repos.cache) private confirmEmailCache: ICacheRepo<string>,
  ) {}

  async confirmEmail({ userId, confirmationCode }: ConfirmEmailArgs): Promise<ConfirmEmailResult> {
    const existingUser = await this.userRepository.getUserById(userId)

    const key = `${confirmEmailKey}_${userId}`
    const confirmationCodes = await this.confirmEmailCache.list(key)
    const isConfirmationCodeExist = confirmationCodes.find((code) => {
      const [_, existingCode] = code.split('-')
      return Number.parseInt(existingCode) === confirmationCode
    })

    if (!isConfirmationCodeExist)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_expired_code',
        message: 'invalid confirmation code',
      })

    const updatedUser = await this.userRepository.saveUser({
      ...(existingUser as User),
      isConfirmed: true,
    })

    const mappedUser = this.userMapper.toDTO(updatedUser)
    return Right.create(mappedUser)
  }

  async requestConfirmEmail(userId: string): Promise<RequestConfirmEmailResult> {
    const existingUser = await this.userRepository.getUserById(userId)
    if (!existingUser || existingUser.isConfirmed)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_operation',
        message: 'invalid operation',
      })

    await this.accountEvents.newConfirmEmailRequest({ userId })
    return Right.create({ done: true })
  }
}
