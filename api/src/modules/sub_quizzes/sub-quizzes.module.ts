import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import SubQuizController from './sub-quizzes.controller'
import SubQuizMapper from './sub-quizzes.mapper'
import { SubQuizSchema } from './sub-quizzes.model'
import SubQuizRepo from './sub-quizzes.repository'
import SubQuizService from './sub-quizzes.services'

const subQuizModel = MongooseModule.forFeature([{ name: Models.subQuizzes, schema: SubQuizSchema }])

@Module({
  imports: [subQuizModel, AccessModule, UsersModule, QuizzesModule],
  controllers: [SubQuizController],
  providers: [
    { provide: Mappers.subQuiz, useClass: SubQuizMapper },
    { provide: Repos.subQuiz, useClass: SubQuizRepo },
    { provide: Services.subQuiz, useClass: SubQuizService },
  ],
})
export default class SubQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(SubQuizController)
  }
}
