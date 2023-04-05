import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import EnrolledQuizzesModule from '../enrolled_quizzes/enrolled-quizzes.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import EnrolledSubQuizController from './enrolled-sub-quizzes.controller'
import EnrolledSubQuizMapper from './enrolled-sub-quizzes.mapper'
import { EnrolledSubQuizSchema } from './enrolled-sub-quizzes.model'
import EnrolledSubQuizRepo from './enrolled-sub-quizzes.repository'
import EnrolledSubQuizService from './enrolled-sub-quizzes.services'

const enrolledSubQuizModel = MongooseModule.forFeature([
  { name: Models.enrolledSubQuizzes, schema: EnrolledSubQuizSchema },
])

@Module({
  imports: [enrolledSubQuizModel, UsersModule, AccessModule, QuizzesModule, EnrolledQuizzesModule],
  controllers: [EnrolledSubQuizController],
  providers: [
    { provide: Mappers.enrolledSubQuiz, useClass: EnrolledSubQuizMapper },
    { provide: Repos.enrolledSubQuiz, useClass: EnrolledSubQuizRepo },
    { provide: Services.enrolledSubQuiz, useClass: EnrolledSubQuizService },
  ],
})
export default class EnrolledSubQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(EnrolledSubQuizController)
  }
}
