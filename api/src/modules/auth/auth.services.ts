import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IHash from 'src/services/hashing'
import { Repositories, Services } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IAccessService from '../access/IAccess.services'
import IRefreshService from '../refresh/IRefresh.services'
import IUserRepo from '../users/IUser.repository'
import IAuthService, { LoginArgs, LoginResult } from './IAuth.services'

@Injectable()
export default class AuthService implements IAuthService {
  constructor(
    @Inject(Repositories.userRepository) private userRepository: IUserRepo,
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

    const accessToken = await this.accessService.generateToken({
      userId: existingUser.userId,
      roles: existingUser.roles,
    })

    const refreshToken = await this.refreshService.createRefreshToken(existingUser.userId)
    return Right.create({ access: accessToken, refresh: refreshToken })
  }
}
