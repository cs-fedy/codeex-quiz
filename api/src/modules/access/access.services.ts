import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import { Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IAccessService, { BaseToken, VerifyTokenResult } from './IAccess.services'
import IWhiteListRepo from './IWhiteList.repository'
import AccessDTO from './access.dto'

@Injectable()
export class AccessService implements IAccessService {
  constructor(
    private jwtService: JwtService,
    @Inject(Repos.whiteList) private whiteListRepository: IWhiteListRepo,
  ) {}

  async generateToken<T extends BaseToken>(payload: T): Promise<AccessDTO> {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
    })

    const expiresIn = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes').valueOf()

    await this.whiteListRepository.add(payload.userId, token)
    return new AccessDTO(token, expiresIn)
  }

  async verifyToken<U extends BaseToken>(
    authorizationHeader: string,
  ): Promise<VerifyTokenResult<U>> {
    const tokenParts = authorizationHeader.split(' ')
    if (tokenParts.length !== 2)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_token',
        message: 'authorization token must be: Bearer [token]',
      })

    const [_, token] = tokenParts
    let payload: U

    try {
      const options = { secret: process.env.JWT_SECRET }
      payload = this.jwtService.verify<U>(token, options)
    } catch (error) {
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_token',
        message: 'invalid/expired token',
      })
    }

    const isWhiteListed = await this.whiteListRepository.exists(payload.userId, token)
    if (!isWhiteListed)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_token',
        message: 'invalid/expired token',
      })
    return Right.create(payload)
  }
}
