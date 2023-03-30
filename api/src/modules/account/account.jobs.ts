import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import * as moment from 'moment'
import IUsersRepo from 'src/modules/users/IUsers.repository'
import { Jobs, Queues, Repos, Services, confirmEmailKey } from 'src/utils/constants'
import generateRandomCode from 'src/utils/randomCode'
import ICacheRepo from '../cache/ICache.repository'
import IMailService from '../mail/IMail.services'
import { NewConfirmEmailRequestArgs } from './iaccount.events'

@Processor(Queues.accounts)
export class AccountConsumer {
  constructor(
    @Inject(Services.mail) private mailService: IMailService,
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Repos.cache) private confirmEmailCache: ICacheRepo<string>,
  ) {}

  @Process(Jobs.newConfirmEmailRequest)
  async newConfirmEmailRequest({ data }: Job<NewConfirmEmailRequestArgs>) {
    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return

    const expiresIn = moment().add(process.env.VERIFY_EMAIL_EXPIRATION_MINUTES, 'm')
    const confirmationCode = generateRandomCode(5)

    await this.mailService.sendEmail({
      to: existingUser.email,
      from: process.env.FROM_EMAIL,
      subject: 'email confirmation code',
      text: `Hello ${existingUser.fullName} you can confirm your 
      email using this code '${confirmationCode}' that will 
      expire in ${expiresIn.calendar()}.`,
    })

    const key = `${confirmEmailKey}_${data.userId}`
    const element = `${Math.floor(expiresIn.valueOf() / 1000)}-${confirmationCode}`
    await this.confirmEmailCache.push(key, element)
  }
}
