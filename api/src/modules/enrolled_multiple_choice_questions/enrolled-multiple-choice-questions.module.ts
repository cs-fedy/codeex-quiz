import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import EnrolledMultipleChoiceQuestionController from './enrolled-multiple-choice-questions.controller'

@Module({
  imports: [AccessModule, UsersModule],
  controllers: [EnrolledMultipleChoiceQuestionController],
})
export default class EnrolledMultipleChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(EnrolledMultipleChoiceQuestionController)
  }
}
