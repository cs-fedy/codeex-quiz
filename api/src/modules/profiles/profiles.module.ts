import { BullModule } from '@nestjs/bull'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Hash } from 'src/services/hashing'
import { Events, Queues, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import ProfileController from './profiles.controllers'
import ProfileEvents from './profiles.events'
import ProfileService from './profiles.services'

const profileQueue = BullModule.registerQueue({ name: Queues.profiles })

@Module({
  imports: [profileQueue, AccessModule, UsersModule],
  controllers: [ProfileController],
  providers: [
    { provide: Services.profile, useClass: ProfileService },
    { provide: Events.profile, useClass: ProfileEvents },
    { provide: Services.hash, useClass: Hash },
  ],
})
export default class ProfilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(ProfileController)
  }
}
