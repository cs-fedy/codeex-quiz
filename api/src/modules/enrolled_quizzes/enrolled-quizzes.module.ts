import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Models } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import EnrolledQuizController from './enrolled-quizzes.controller'
import { EnrolledQuizSchema } from './enrolled-quizzes.model'

const enrolledQuizzesModel = MongooseModule.forFeature([
  { name: Models.enrolledQuizzes, schema: EnrolledQuizSchema },
])

@Module({
  imports: [enrolledQuizzesModel, AccessModule, UsersModule],
  controllers: [EnrolledQuizController],
})
export default class EnrolledQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(EnrolledQuizController)
  }
}
