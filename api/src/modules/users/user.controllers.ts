import { Body, Controller, Get, HttpException, Inject } from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import IUserService from './IUser.services'
import GetLoggedUserArgs from './validators/logged'

@Controller(Routes.users)
export default class UsersController {
  constructor(@Inject(Services.user) private userService: IUserService) {}

  @Get(Routes.logged)
  async getLoggedUser(@Body() { userId }: GetLoggedUserArgs) {
    const loggedUser = await this.userService.getUser(userId)
    if (loggedUser.isLeft()) {
      const { code, message, status } = loggedUser.error
      throw new HttpException({ message, code }, status)
    }

    return { loggedUser: loggedUser.value }
  }
}
