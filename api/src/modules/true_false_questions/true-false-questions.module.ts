import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import SubQuizzesModule from '../sub_quizzes/sub-quizzes.module'
import UsersModule from '../users/users.module'
import TrueFalseQuestionController from './true-false-questions.controller'
import TrueFalseQuestionMapper from './true-false-questions.mapper'
import { TrueFalseQuestionSchema } from './true-false-questions.model'
import TrueFalseQuestionRepo from './true-false-questions.repository'
import TrueFalseQuestionService from './true-false-questions.services'

const trueFalseQuestionModel = MongooseModule.forFeature([
  { name: Models.trueFalseQuestion, schema: TrueFalseQuestionSchema },
])

@Module({
  imports: [trueFalseQuestionModel, AccessModule, UsersModule, QuizzesModule, SubQuizzesModule],
  controllers: [TrueFalseQuestionController],
  providers: [
    { provide: Mappers.trueFalseQuestion, useClass: TrueFalseQuestionMapper },
    { provide: Repos.trueFalseQuestion, useClass: TrueFalseQuestionRepo },
    { provide: Services.trueFalseQuestion, useClass: TrueFalseQuestionService },
  ],
  exports: [{ provide: Repos.trueFalseQuestion, useClass: TrueFalseQuestionRepo }],
})
export default class TrueFalseQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(TrueFalseQuestionController)
  }
}
