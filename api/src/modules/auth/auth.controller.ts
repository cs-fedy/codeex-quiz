import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common'
import { Services } from 'src/utils/constants'
import IUserService from '../users/IUser.services'
import RegisterArgs from './validators/register'

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(Services.userService) private userService: IUserService,
  ) {}

  @Post('register')
  async register(@Body() registerArgs: RegisterArgs) {
    const createdUser = await this.userService.createUser(registerArgs)
    if (createdUser.isLeft()) {
      const { code, status, message } = createdUser.error
      throw new HttpException({ code, message }, status)
    }

    return { createdUser: createdUser.value }
  }
}
