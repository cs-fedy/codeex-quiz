import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Queues, Repos, Services } from 'src/utils/constants'
import IWhiteListRepo from '../access/i-white-list.repository'
import IMailService from '../mail/i-mail.services'
import IUsersRepo from '../users/i-users.repository'
import { NewPasswordUpdatedArgs, NewResetPasswordRequestArgs } from './i-reset-password.events'

@Processor(Queues.resetPassword)
export default class ResetPasswordConsumer {
  constructor(
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Repos.whiteList) private whiteListRepo: IWhiteListRepo,
    @Inject(Services.mail) private mailService: IMailService,
  ) {}

  @Process(Jobs.newResetPasswordRequest)
  async newResetPasswordRequest({ data }: Job<NewResetPasswordRequestArgs>) {
    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return null

    await this.mailService.sendEmail({
      to: existingUser.email,
      from: process.env.FROM_EMAIL,
      subject: 'reset password code',
      text: `Hello ${existingUser.fullName} to reset your 
      password using this code '${data.code}' that will expire in ${data.expiresIn}.`,
    })
  }

  @Process(Jobs.newPasswordUpdated)
  async newPasswordUpdated({ data }: Job<NewPasswordUpdatedArgs>) {
    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return null

    await this.mailService.sendEmail({
      to: existingUser.email,
      from: process.env.FROM_EMAIL,
      subject: 'password updated',
      text: `Hello ${existingUser.fullName} your password is being
      change. you are being logged out from all the devices shortly`,
    })

    await this.whiteListRepo.clear(data.userId)
  }
}
