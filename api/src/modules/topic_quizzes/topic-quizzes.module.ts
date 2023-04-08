import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import TopicsModule from '../topics/topics.module'
import UsersModule from '../users/users.module'
import TopicQuizController from './topic-quizzes.controller'
import TopicQuizMapper from './topic-quizzes.mapper'
import { TopicQuizSchema } from './topic-quizzes.model'
import TopicQuizRepo from './topic-quizzes.repository'
import TopicQuizService from './topic-quizzes.services'

const topicQuizModel = MongooseModule.forFeature([
  { name: Models.topicQuizzes, schema: TopicQuizSchema },
])

@Module({
  imports: [topicQuizModel, AccessModule, UsersModule, QuizzesModule, TopicsModule],
  controllers: [TopicQuizController],
  providers: [
    { provide: Mappers.topicQuiz, useClass: TopicQuizMapper },
    { provide: Repos.topicQuiz, useClass: TopicQuizRepo },
    { provide: Services.topicQuiz, useClass: TopicQuizService },
  ],
})
export default class TopicQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(TopicQuizController)
  }
}
