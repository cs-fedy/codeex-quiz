import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import EnrolledQuizzesModule from '../enrolled_quizzes/enrolled-quizzes.module'
import EnrolledSubQuizzesModule from '../enrolled_sub_quizzes/enrolled-sub-quizzes.module'
import MultipleChoiceQuestionsModule from '../multiple_choice_questions/multiple-choice-questions.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import EnrolledMultipleChoiceQuestionController from './enrolled-multiple-choice-questions.controller'
import EnrolledMultipleChoiceQuestionMapper from './enrolled-multiple-choice-questions.mapper'
import { EnrolledMultipleChoiceQuestionSchema } from './enrolled-multiple-choice-questions.model'
import EnrolledMultipleChoiceQuestionRepo from './enrolled-multiple-choice-questions.repository'
import EnrolledMultipleChoiceQuestionService from './enrolled-multiple-choice-questions.services'

const enrolledMultipleChoiceQuestionModel = MongooseModule.forFeature([
  { name: Models.enrolledMultipleChoiceQuestions, schema: EnrolledMultipleChoiceQuestionSchema },
])

@Module({
  imports: [
    enrolledMultipleChoiceQuestionModel,
    AccessModule,
    UsersModule,
    QuizzesModule,
    EnrolledQuizzesModule,
    MultipleChoiceQuestionsModule,
    EnrolledSubQuizzesModule,
  ],
  controllers: [EnrolledMultipleChoiceQuestionController],
  providers: [
    {
      provide: Mappers.enrolledMultipleChoiceQuestion,
      useClass: EnrolledMultipleChoiceQuestionMapper,
    },
    { provide: Repos.enrolledMultipleChoiceQuestion, useClass: EnrolledMultipleChoiceQuestionRepo },
    {
      provide: Services.enrolledMultipleChoiceQuestion,
      useClass: EnrolledMultipleChoiceQuestionService,
    },
  ],
})
export default class EnrolledMultipleChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(EnrolledMultipleChoiceQuestionController)
  }
}
