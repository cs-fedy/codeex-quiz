import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import EnrolledQuizzesModule from '../enrolled_quizzes/enrolled-quizzes.module'
import EnrolledSubQuizzesModule from '../enrolled_sub_quizzes/enrolled-sub-quizzes.module'
import QuizzesModule from '../quizzes/quizzes.module'
import TrueFalseQuestionsModule from '../true_false_questions/true-false-questions.module'
import UsersModule from '../users/users.module'
import EnrolledTrueFalseQuestionController from './enrolled-true-false-questions.controller'
import EnrolledTrueFalseQuestionMapper from './enrolled-true-false-questions.mapper'
import { EnrolledTrueFalseQuestionSchema } from './enrolled-true-false-questions.model'
import EnrolledTrueFalseQuestionRepo from './enrolled-true-false-questions.repository'
import EnrolledTrueFalseQuestionService from './enrolled-true-false-questions.services'

const enrolledTrueFalseQuestionModel = MongooseModule.forFeature([
  { name: Models.enrolledTrueFalseQuestions, schema: EnrolledTrueFalseQuestionSchema },
])

@Module({
  imports: [
    enrolledTrueFalseQuestionModel,
    AccessModule,
    UsersModule,
    QuizzesModule,
    EnrolledQuizzesModule,
    TrueFalseQuestionsModule,
    EnrolledSubQuizzesModule,
  ],
  controllers: [EnrolledTrueFalseQuestionController],
  providers: [
    {
      provide: Mappers.enrolledTrueFalseQuestion,
      useClass: EnrolledTrueFalseQuestionMapper,
    },
    { provide: Repos.enrolledTrueFalseQuestion, useClass: EnrolledTrueFalseQuestionRepo },
    {
      provide: Services.enrolledTrueFalseQuestion,
      useClass: EnrolledTrueFalseQuestionService,
    },
  ],
})
export default class EnrolledTrueFalseQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(EnrolledTrueFalseQuestionController)
  }
}
