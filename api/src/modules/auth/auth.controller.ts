import { Body, Controller, HttpException, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { Routes, Services, refreshKey } from 'src/utils/constants'
import { refreshTokenCookieOptions } from 'src/utils/cookieOptions'
import IUserService from '../users/IUser.services'
import IAuthService from './IAuth.services'
import { LoginArgs } from './validators/login'
import { LogoutArgs } from './validators/logout'
import RegisterArgs from './validators/register'

@Controller(Routes.auth)
export default class AuthController {
  constructor(
    @Inject(Services.user) private userService: IUserService,
    @Inject(Services.auth) private authService: IAuthService,
  ) {}

  @Post(Routes.register)
  async register(@Body() registerArgs: RegisterArgs) {
    const createdUser = await this.userService.createUser(registerArgs)
    if (createdUser.isLeft()) {
      const { code, status, message } = createdUser.error
      throw new HttpException({ code, message }, status)
    }

    return { createdUser: createdUser.value }
  }

  @Post(Routes.login)
  async login(@Body() loginArgs: LoginArgs, @Res() res: Response) {
    const loggedUser = await this.authService.login(loginArgs)
    if (loggedUser.isLeft()) {
      const { status, message, code } = loggedUser.error
      throw new HttpException({ message, code }, status)
    }

    res.cookie(refreshKey, loggedUser.value.refresh.token, {
      ...refreshTokenCookieOptions,
      expires: new Date(loggedUser.value.refresh.expiresIn),
    })
    return res.status(HttpStatus.OK).json(loggedUser.value)
  }

  @Post(Routes.logout)
  async logout(@Body() logoutDto: LogoutArgs, @Res() res: Response) {
    const loggedOutUser = await this.authService.logout(logoutDto)
    if (loggedOutUser.isLeft()) {
      const { message, status, code } = loggedOutUser.error
      throw new HttpException({ message, code }, status)
    }

    res.cookie(refreshKey, '', refreshTokenCookieOptions)
    return res.status(HttpStatus.OK).json(loggedOutUser.value)
  }

  @Post(Routes.refresh)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[refreshKey]
    if (!refreshToken)
      throw new HttpException(
        { code: 'invalid_input', payload: { refreshToken: 'refresh token is required' } },
        HttpStatus.BAD_REQUEST,
      )

    const loggedUser = await this.authService.refresh({ refreshToken: refreshToken })
    if (loggedUser.isLeft()) {
      const { code, status, message } = loggedUser.error
      throw new HttpException({ message, code }, status)
    }

    res.cookie(refreshKey, loggedUser.value.refresh.token, {
      ...refreshTokenCookieOptions,
      expires: new Date(loggedUser.value.refresh.expiresIn),
    })

    return res.status(HttpStatus.OK).json(loggedUser.value)
  }
}
