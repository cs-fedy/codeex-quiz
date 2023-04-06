import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import EnrolledMultipleChoiceQuestionController from './enrolled-multiple-choice-questions.controller'
import EnrolledMultipleChoiceQuestionMapper from './enrolled-multiple-choice-questions.mapper'
import { EnrolledMultipleChoiceQuestionSchema } from './enrolled-multiple-choice-questions.model'
import EnrolledMultipleChoiceQuestionRepo from './enrolled-multiple-choice-questions.repository'

const enrolledMultipleChoiceQuestionModel = MongooseModule.forFeature([
  { name: Models.enrolledMultipleChoiceQuestions, schema: EnrolledMultipleChoiceQuestionSchema },
])

@Module({
  imports: [enrolledMultipleChoiceQuestionModel, AccessModule, UsersModule],
  controllers: [EnrolledMultipleChoiceQuestionController],
  providers: [
    {
      provide: Mappers.enrolledMultipleChoiceQuestion,
      useClass: EnrolledMultipleChoiceQuestionMapper,
    },
    { provide: Repos.enrolledMultipleChoiceQuestion, useClass: EnrolledMultipleChoiceQuestionRepo },
  ],
})
export default class EnrolledMultipleChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(EnrolledMultipleChoiceQuestionController)
  }
}
