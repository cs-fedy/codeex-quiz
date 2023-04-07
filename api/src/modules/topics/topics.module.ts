import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import TopicController from './topics.controller'
import TopicMapper from './topics.mapper'
import { TopicSchema } from './topics.model'
import TopicRepo from './topics.repository'
import TopicService from './topics.services'

const topicModel = MongooseModule.forFeature([{ name: Models.topics, schema: TopicSchema }])

@Module({
  imports: [topicModel, AccessModule, UsersModule],
  controllers: [TopicController],
  providers: [
    { provide: Mappers.topic, useClass: TopicMapper },
    { provide: Repos.topic, useClass: TopicRepo },
    { provide: Services.topic, useClass: TopicService },
  ],
})
export default class TopicsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(TopicController)
  }
}
