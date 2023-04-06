import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import SubQuizzesModule from '../sub_quizzes/sub-quizzes.module'
import UsersModule from '../users/users.module'
import MultipleChoiceQuestionController from './multiple-choice-questions.controller'
import MultipleChoiceQuestionMapper from './multiple-choice-questions.mapper'
import { MultipleChoiceQuestionSchema } from './multiple-choice-questions.model'
import MultipleChoiceQuestionRepo from './multiple-choice-questions.repository'
import MultipleChoiceQuestionService from './multiple-choice-questions.services'

const multipleChoiceQuestionModel = MongooseModule.forFeature([
  { name: Models.multipleChoiceQuestion, schema: MultipleChoiceQuestionSchema },
])

@Module({
  imports: [
    multipleChoiceQuestionModel,
    AccessModule,
    UsersModule,
    QuizzesModule,
    SubQuizzesModule,
  ],
  controllers: [MultipleChoiceQuestionController],
  providers: [
    { provide: Mappers.multipleChoiceQuestion, useClass: MultipleChoiceQuestionMapper },
    { provide: Repos.multipleChoiceQuestion, useClass: MultipleChoiceQuestionRepo },
    { provide: Services.multipleChoiceQuestion, useClass: MultipleChoiceQuestionService },
  ],
  exports: [{ provide: Repos.multipleChoiceQuestion, useClass: MultipleChoiceQuestionRepo }],
})
export default class MultipleChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(MultipleChoiceQuestionController)
  }
}
