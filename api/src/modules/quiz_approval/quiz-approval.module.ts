import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import NotificationsModule from '../notifications/notifications.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import QuizApprovalController from './quiz-approval.controller'
import QuizApprovalService from './quiz-approval.services'

@Module({
  imports: [AccessModule, UsersModule, NotificationsModule, QuizzesModule],
  controllers: [QuizApprovalController],
  providers: [{ provide: Services.quizApproval, useClass: QuizApprovalService }],
})
export default class QuizzesApprovalModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(QuizApprovalController)
  }
}
