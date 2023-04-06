import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import EnrolledQuizzesModule from '../enrolled_quizzes/enrolled-quizzes.module'
import EnrolledSubQuizzesModule from '../enrolled_sub_quizzes/enrolled-sub-quizzes.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UniqueChoiceQuestionsModule from '../unique_choice_questions/unique-choice-questions.module'
import UsersModule from '../users/users.module'
import EnrolledUniqueChoiceQuestionController from './enrolled-unique-choice-questions.controller'
import EnrolledUniqueChoiceQuestionMapper from './enrolled-unique-choice-questions.mapper'
import { EnrolledUniqueChoiceQuestionSchema } from './enrolled-unique-choice-questions.model'
import EnrolledUniqueChoiceQuestionRepo from './enrolled-unique-choice-questions.repository'
import EnrolledUniqueChoiceQuestionService from './enrolled-unique-choice-questions.services'

const enrolledUniqueChoiceQuestionModel = MongooseModule.forFeature([
  { name: Models.enrolledUniqueChoiceQuestions, schema: EnrolledUniqueChoiceQuestionSchema },
])

@Module({
  imports: [
    enrolledUniqueChoiceQuestionModel,
    AccessModule,
    UsersModule,
    QuizzesModule,
    EnrolledQuizzesModule,
    UniqueChoiceQuestionsModule,
    EnrolledSubQuizzesModule,
  ],
  controllers: [EnrolledUniqueChoiceQuestionController],
  providers: [
    {
      provide: Mappers.enrolledUniqueChoiceQuestion,
      useClass: EnrolledUniqueChoiceQuestionMapper,
    },
    { provide: Repos.enrolledUniqueChoiceQuestion, useClass: EnrolledUniqueChoiceQuestionRepo },
    {
      provide: Services.enrolledUniqueChoiceQuestion,
      useClass: EnrolledUniqueChoiceQuestionService,
    },
  ],
})
export default class EnrolledUniqueChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(EnrolledUniqueChoiceQuestionController)
  }
}
