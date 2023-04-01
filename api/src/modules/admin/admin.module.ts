import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import NotificationsModule from '../notifications/notifications.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import AdminController from './admin.controllers'
import AdminService from './admin.services'

@Module({
  controllers: [AdminController],
  imports: [AccessModule, UsersModule, QuizzesModule, NotificationsModule],
  providers: [{ provide: Services.admin, useClass: AdminService }],
})
export default class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(AdminController)
  }
}
