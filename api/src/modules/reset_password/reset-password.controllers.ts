import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common'
import { Routes, Services } from 'src/utils/constants'
import IResetPasswordService from './i-reset-password.services'
import RequestResetPasswordArgs from './validators/request-reset-password'
import ResetPasswordArgs from './validators/reset-password'

@Controller(Routes.password)
export default class ResetPasswordController {
  constructor(
    @Inject(Services.resetPassword)
    private resetPasswordService: IResetPasswordService,
  ) {}

  @Post(Routes.request)
  async requestResetPassword(@Body() { userEmail }: RequestResetPasswordArgs) {
    const resetPasswordRequest = await this.resetPasswordService.requestResetPassword(userEmail)
    if (resetPasswordRequest.isLeft()) {
      const { code, message, status } = resetPasswordRequest.error
      throw new HttpException({ message, code }, status)
    }

    return { request: resetPasswordRequest.value }
  }

  @Post(Routes.reset)
  async resetPassword(@Body() args: ResetPasswordArgs) {
    const updatedPassword = await this.resetPasswordService.resetPassword(args)
    if (updatedPassword.isLeft()) {
      const { code, message, status } = updatedPassword.error
      throw new HttpException({ code, message }, status)
    }

    return updatedPassword.value
  }
}
