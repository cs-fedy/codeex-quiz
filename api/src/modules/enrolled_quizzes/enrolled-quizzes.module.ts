import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import EnrolledQuizController from './enrolled-quizzes.controller'
import EnrolledQuizMapper from './enrolled-quizzes.mapper'
import { EnrolledQuizSchema } from './enrolled-quizzes.model'
import EnrolledQuizRepo from './enrolled-quizzes.repository'
import EnrolledQuizService from './enrolled-quizzes.services'

const enrolledQuizzesModel = MongooseModule.forFeature([
  { name: Models.enrolledQuizzes, schema: EnrolledQuizSchema },
])

@Module({
  imports: [enrolledQuizzesModel, AccessModule, UsersModule, QuizzesModule],
  controllers: [EnrolledQuizController],
  providers: [
    { provide: Mappers.enrolledQuiz, useClass: EnrolledQuizMapper },
    { provide: Repos.enrolledQuiz, useClass: EnrolledQuizRepo },
    { provide: Services.enrolledQuiz, useClass: EnrolledQuizService },
  ],
  exports: [{ provide: Repos.enrolledQuiz, useClass: EnrolledQuizRepo }],
})
export default class EnrolledQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(EnrolledQuizController)
  }
}
