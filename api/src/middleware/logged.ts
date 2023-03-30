import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import IUserService from 'src/modules/users/IUser.services'
import { Services } from 'src/utils/constants'

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
  constructor(@Inject(Services.user) private userService: IUserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.body
    const existingUser = await this.userService.getUser(userId)
    const isUserExist = existingUser.isRight()
    if (!isUserExist) {
      const userDoesNotExist = new HttpException(
        {
          message: 'logged user is not found',
          code: 'user_not_found',
          payload: { userId },
        },
        HttpStatus.BAD_REQUEST,
      )
      return next(userDoesNotExist)
    }

    Object.assign(req.body, { loggedUser: existingUser.value })
    return next()
  }
}
