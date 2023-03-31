import { Body, Controller, HttpException, Inject, Post, UseGuards } from '@nestjs/common'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import IAccountService from './i-accounts.services'
import ConfirmEmailArgs from './validators/confirm-email'

@Controller(Routes.accounts)
@UseGuards(RoleGuard(Roles.self))
export default class AccountController {
  constructor(@Inject(Services.accounts) private accountService: IAccountService) {}

  @Post(Routes.confirm)
  async confirmEmail(@Body() args: ConfirmEmailArgs) {
    const confirmedAccount = await this.accountService.confirmEmail(args)
    if (confirmedAccount.isLeft()) {
      const { code, status, message } = confirmedAccount.error
      throw new HttpException({ message, code }, status)
    }

    return { confirmedAccount: confirmedAccount.value }
  }

  @Post(Routes.request)
  async requestConfirmEmail(@Body('userId') userId: string) {
    // eslint-disable-next-line max-len
    const confirmEmailRequest = await this.accountService.requestConfirmEmail(userId)

    if (confirmEmailRequest.isLeft()) {
      const { code, status, message } = confirmEmailRequest.error
      throw new HttpException({ message, code }, status)
    }

    return { status: confirmEmailRequest.value }
  }
}
