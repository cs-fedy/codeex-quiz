import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import IAccessService from 'src/modules/access/IAccess.services'
import { Services } from 'src/utils/constants'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(@Inject(Services.access) private accessService: IAccessService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization']
    if (!authorization) {
      const authHeaderDoesNotExist = new HttpException(
        'authorization header must be provided',
        HttpStatus.BAD_REQUEST,
      )
      return next(authHeaderDoesNotExist)
    }

    const tokenPayload = await this.accessService.verifyToken(authorization)
    if (tokenPayload.isLeft()) {
      const { code, status, message } = tokenPayload.error
      const invalidToken = new HttpException({ message, code }, status)
      return next(invalidToken)
    }

    Object.assign(req.body, {
      ...tokenPayload.value,
      accessToken: authorization.split(' ')[1],
    })
    next()
  }
}
