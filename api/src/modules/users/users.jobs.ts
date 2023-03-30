import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import * as moment from 'moment'
import { Jobs, Queues, Repos, Services, confirmEmailKey } from 'src/utils/constants'
import generateRandomCode from 'src/utils/randomCode'
import ICacheRepo from '../cache/ICache.repository'
import IMailService from '../mail/IMail.services'
import { NewUserExistArgs } from './IUsers.events'
import IUsersRepo from './IUsers.repository'

@Processor(Queues.users)
export class UserConsumer {
  constructor(
    @Inject(Services.mail) private mailService: IMailService,
    @Inject(Repos.user) private userRepository: IUsersRepo,
    @Inject(Repos.cache) private confirmEmailCache: ICacheRepo<string>,
  ) {}

  @Process(Jobs.newUserExist)
  async newUserExist({ data }: Job<NewUserExistArgs>) {
    const verifyEmailExpirationMinutes = process.env.VERIFY_EMAIL_EXPIRATION_MINUTES
    const verifyEmailExpirationSeconds = verifyEmailExpirationMinutes * 60

    const existingUser = await this.userRepository.getUserById(data.userId)
    if (!existingUser) return

    const confirmationCode = generateRandomCode(5)
    const expiresIn = moment().add(verifyEmailExpirationMinutes, 'm')

    await this.mailService.sendEmail({
      to: existingUser.email,
      from: process.env.FROM_EMAIL,
      subject: 'account created',
      text: `congratulations ${existingUser.fullName} 
        your account is created successfully. To continue using 
        the platform you must first confirm your email using this code
        '${confirmationCode}' that will expire in ${expiresIn.calendar()}.`,
    })

    const key = `${confirmEmailKey}_${data.userId}`
    const element = `${verifyEmailExpirationSeconds}-${confirmationCode}`
    await this.confirmEmailCache.push(key, element)
  }
}
