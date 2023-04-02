import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import SubQuizzesModule from '../sub_quizzes/sub-quizzes.module'
import UsersModule from '../users/users.module'
import UniqueChoiceQuestionController from './unique-choice-questions.controller'
import UniqueChoiceQuestionMapper from './unique-choice-questions.mapper'
import { UniqueChoiceQuestionSchema } from './unique-choice-questions.model'
import UniqueChoiceQuestionRepo from './unique-choice-questions.repository'
import UniqueChoiceQuestionService from './unique-choice-questions.services'

const uniqueChoiceQuestionModel = MongooseModule.forFeature([
  { name: Models.uniqueChoiceQuestion, schema: UniqueChoiceQuestionSchema },
])

@Module({
  imports: [uniqueChoiceQuestionModel, AccessModule, UsersModule, QuizzesModule, SubQuizzesModule],
  controllers: [UniqueChoiceQuestionController],
  providers: [
    { provide: Mappers.uniqueChoiceQuestion, useClass: UniqueChoiceQuestionMapper },
    { provide: Repos.uniqueChoiceQuestion, useClass: UniqueChoiceQuestionRepo },
    { provide: Services.uniqueChoiceQuestion, useClass: UniqueChoiceQuestionService },
  ],
})
export default class UniqueChoiceQuestionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(UniqueChoiceQuestionController)
  }
}
