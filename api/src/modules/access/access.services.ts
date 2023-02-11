import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import moment from 'moment'
import { Repositories } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IAccessService, { VerifyTokenResult } from './IAccess.services'
import IWhiteListRepo from './IWhiteList.repository'
import AccessDTO from './access.dto'

@Injectable()
export class AccessService implements IAccessService {
  constructor(
    private jwtService: JwtService,
    @Inject(Repositories.whiteListRepository) private whiteListRepository: IWhiteListRepo,
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

  verifyToken<U extends object>(token: string): VerifyTokenResult<U> {
    try {
      const payload = this.jwtService.verify<U>(token)
      return Right.create(payload)
    } catch (error) {
      return Left.create({
        status: HttpStatus.BAD_REQUEST,
        code: 'invalid_token',
        message: 'invalid/expired token',
      })
    }
  }
}
