import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import { Repositories } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IAccessService, { VerifyTokenResult } from './IAccess.services'
import IWhiteListRepo from './IWhiteList.repository'
import AccessDTO from './access.dto'

@Injectable()
export class AccessService implements IAccessService {
  constructor(
    private jwtService: JwtService,
    @Inject(Repositories.whiteList) private whiteListRepository: IWhiteListRepo,
  ) {}

  async generateToken(payload: any): Promise<AccessDTO> {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
    })

    const expiresIn = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes').valueOf()

    await this.whiteListRepository.add(payload.userId, token)
    return new AccessDTO(token, expiresIn)
  }

  async verifyToken<U extends { userId: string }>(
    authorizationHeader: string,
  ): Promise<VerifyTokenResult<U>> {
    const token = authorizationHeader.split(' ')[1]
    if (!token)
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_token',
        message: 'authorization token must be: Bearer [token]',
      })

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
