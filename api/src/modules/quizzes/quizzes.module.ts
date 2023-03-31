import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import QuizController from './quizzes.controller'
import QuizMapper from './quizzes.mapper'
import { QuizSchema } from './quizzes.model'
import QuizRepo from './quizzes.repository'
import QuizService from './quizzes.services'

const quizModel = MongooseModule.forFeature([{ name: Models.quizzes, schema: QuizSchema }])

@Module({
  imports: [quizModel, AccessModule, UsersModule],
  controllers: [QuizController],
  providers: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
    { provide: Services.quiz, useClass: QuizService },
  ],
  exports: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
  ],
})
export default class QuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(QuizController)
  }
}
