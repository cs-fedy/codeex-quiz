import { BullModule } from '@nestjs/bull'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Events, Queues, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import CacheModule from '../cache/cache.module'
import MailModule from '../mail/mail.module'
import UsersModule from '../users/users.module'
import AccountController from './accounts.controller'
import AccountEvents from './accounts.events'
import { AccountConsumer } from './accounts.jobs'
import AccountService from './accounts.services'

const accountQueue = BullModule.registerQueue({ name: Queues.accounts })

@Module({
  controllers: [AccountController],
  imports: [accountQueue, AccessModule, MailModule, CacheModule, UsersModule],
  providers: [
    { provide: Services.accounts, useClass: AccountService },
    { provide: Queues.accounts, useClass: AccountConsumer },
    { provide: Events.accounts, useClass: AccountEvents },
  ],
})
export default class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(AccountController)
  }
}
