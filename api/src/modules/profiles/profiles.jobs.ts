import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Queues, Repos, Services } from 'src/utils/constants'
import IWhiteListRepo from '../access/IWhiteList.repository'
import IMailService from '../mail/IMail.services'
import IUsersRepo from '../users/IUsers.repository'
import { NewEmailUpdatedArgs, NewPasswordUpdatedArgs } from './IProfiles.events'

@Processor(Queues.profiles)
export default class ProfileConsumer {
  constructor(
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Services.mail) private mailService: IMailService,
    @Inject(Repos.whiteList) private whiteListRepository: IWhiteListRepo,
  ) {}

  @Process(Jobs.newProfileEmailUpdated)
  async newEmailUpdated({ data }: Job<NewEmailUpdatedArgs>) {
    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return

    await this.mailService.sendEmail({
      to: [data.newEmail, data.oldEmail],
      from: process.env.FROM_EMAIL,
      subject: 'email updated',
      text: `Hello ${existingUser.fullName} your email is updated from
      ${data.oldEmail} to ${data.newEmail}. You are being logged of from all the devices.`,
    })

    await this.whiteListRepository.clear(data.userId)
  }

  @Process(Jobs.newProfilePasswordUpdated)
  async newPasswordUpdated({ data }: Job<NewPasswordUpdatedArgs>) {
    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return

    await this.mailService.sendEmail({
      to: existingUser.email,
      from: process.env.FROM_EMAIL,
      subject: 'password updated',
      text: `Hello ${existingUser.fullName} your password 
      is updated successfully. You are being logged of from all the devices.`,
    })

    await this.whiteListRepository.clear(data.userId)
  }
}
