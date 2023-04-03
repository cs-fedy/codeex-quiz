import { BullModule } from '@nestjs/bull'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Events, Mappers, Models, Queues, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import NewSubQuizEvents from './new-quiz.events'
import { NewSubQuizConsumer } from './new-quiz.jobs'
import SubQuizController from './sub-quizzes.controller'
import SubQuizMapper from './sub-quizzes.mapper'
import { SubQuizSchema } from './sub-quizzes.model'
import SubQuizRepo from './sub-quizzes.repository'
import SubQuizService from './sub-quizzes.services'

// TODO: for each sub quiz module user can provide a color for each object. Otherwise default colors are provided
const subQuizModel = MongooseModule.forFeature([{ name: Models.subQuizzes, schema: SubQuizSchema }])
const newSubQuizQueue = BullModule.registerQueue({ name: Queues.newSubQuiz })

@Module({
  imports: [subQuizModel, newSubQuizQueue, AccessModule, UsersModule, QuizzesModule],
  controllers: [SubQuizController],
  providers: [
    { provide: Mappers.subQuiz, useClass: SubQuizMapper },
    { provide: Repos.subQuiz, useClass: SubQuizRepo },
    { provide: Services.subQuiz, useClass: SubQuizService },
    { provide: Events.newSubQuiz, useClass: NewSubQuizEvents },
    { provide: Queues.newSubQuiz, useClass: NewSubQuizConsumer },
  ],
  exports: [{ provide: Events.newSubQuiz, useClass: NewSubQuizEvents }],
})
export default class SubQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(SubQuizController)
  }
}
