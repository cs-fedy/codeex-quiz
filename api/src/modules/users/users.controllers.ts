import { Body, Controller, Get, HttpException, Inject, Param, UseGuards } from '@nestjs/common'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IUserService from './i-users.services'

@Controller(Routes.users)
@UseGuards(RoleGuard(Roles.self))
export default class UsersController {
  constructor(@Inject(Services.user) private userService: IUserService) {}

  @Get(Routes.logged)
  async getLogged(@Body('userId') userId: string) {
    const loggedUser = await this.userService.getUser(userId)
    if (loggedUser.isLeft()) {
      const { code, message, status } = loggedUser.error
      throw new HttpException({ message, code }, status)
    }

    return { loggedUser: loggedUser.value }
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const fetchedUser = await this.userService.getUser(userId)
    if (fetchedUser.isLeft()) {
      const { code, message, status } = fetchedUser.error
      throw new HttpException({ message, code }, status)
    }

    return { user: fetchedUser.value }
  }
}
