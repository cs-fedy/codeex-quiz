import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { Hash } from 'src/services/hashing'
import { Events, Queues, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import CacheModule from '../cache/cache.module'
import MailModule from '../mail/mail.module'
import UsersModule from '../users/users.module'
import ResetPasswordController from './resetPassword.controllers'
import ResetPasswordEvents from './resetPassword.events'
import ResetPasswordConsumer from './resetPassword.jobs'
import ResetPasswordService from './resetPassword.services'

const resetPasswordQueue = BullModule.registerQueue({
  name: Queues.resetPassword,
})

@Module({
  imports: [resetPasswordQueue, UsersModule, MailModule, AccessModule, CacheModule],
  controllers: [ResetPasswordController],
  providers: [
    { provide: Events.resetPassword, useClass: ResetPasswordEvents },
    { provide: Queues.resetPassword, useClass: ResetPasswordConsumer },
    { provide: Services.resetPassword, useClass: ResetPasswordService },
    { provide: Services.hash, useClass: Hash },
  ],
})
export default class ResetPasswordModule {}
