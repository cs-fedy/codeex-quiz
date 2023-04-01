import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IUserRepo from 'src/modules/users/i-users.repository'
import IHash from 'src/services/hashing'
import { Repos, Services } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IAccessService from '../access/i-access.services'
import IWhiteListRepo from '../access/i-white-list.repository'
import IRefreshRepo from '../refresh/i-refresh.repository'
import IRefreshService from '../refresh/i-refresh.services'
import IAuthService, {
  LoginArgs,
  LoginResult,
  LogoutArgs,
  LogoutResult,
  RefreshArgs,
  RefreshResult,
} from './i-auth.services'

@Injectable()
export default class AuthService implements IAuthService {
  constructor(
    @Inject(Repos.user) private userRepository: IUserRepo,
    @Inject(Repos.refresh) private refreshRepository: IRefreshRepo,
    @Inject(Repos.whiteList) private whiteListRepository: IWhiteListRepo,
    @Inject(Services.hash) private hashService: IHash,
    @Inject(Services.access) private accessService: IAccessService,
    @Inject(Services.refresh) private refreshService: IRefreshService,
  ) {}

  async login(args: LoginArgs): Promise<LoginResult> {
    const existingUser = await this.userRepository.getUserByUsername(args.username)
    if (!existingUser)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials ',
      })

    const isValidPassword = await this.hashService.compare(args.password, existingUser.password)
    if (!isValidPassword)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_credentials',
        message: 'invalid credentials ',
      })

    const tokens = await this.getTokens(existingUser.userId, existingUser.roles)
    return Right.create(tokens)
  }

  async refresh({ refreshToken }: RefreshArgs): Promise<RefreshResult> {
    const existingRefresh = await this.refreshRepository.getToken(refreshToken)
    if (!existingRefresh)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_refresh_token',
        message: 'invalid/expired refresh token',
      })

    const existingUser = await this.userRepository.getUserById(existingRefresh.owner)
    if (!existingUser)
      return Left.create({
        status: HttpStatus.NOT_FOUND,
        code: 'user_not_found',
        message: 'token owner is not found',
      })

    const tokens = await this.getTokens(existingUser.userId, existingUser.roles)
    return Right.create(tokens)
  }

  async logout(args: LogoutArgs): Promise<LogoutResult> {
    try {
      await this.whiteListRepository.remove(args.userId, args.accessToken)
      await this.refreshRepository.removeToken(args.refreshToken)
      return Right.create({ message: 'logged out successfully' })
    } catch (error) {
      return Left.create({
        code: 'internal_server_error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'something wrong happened',
      })
    }
  }

  private async getTokens(userId: string, roles: Array<string>) {
    const accessTokenPayload = { userId: userId, roles: roles }
    const accessToken = await this.accessService.generateToken(accessTokenPayload)

    const refreshToken = await this.refreshService.createRefreshToken(userId)
    return { access: accessToken, refresh: refreshToken }
  }
}
