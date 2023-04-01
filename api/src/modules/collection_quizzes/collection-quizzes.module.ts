import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import CollectionsModule from '../collections/collections.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import CollectionQuizController from './collection-quizzes.controller'
import CollectionQuizMapper from './collection-quizzes.mapper'
import { CollectionQuizSchema } from './collection-quizzes.model'
import CollectionQuizRepo from './collection-quizzes.repository'
import CollectionQuizService from './collection-quizzes.services'

const collectionQuizModel = MongooseModule.forFeature([
  { name: Models.collectionQuizzes, schema: CollectionQuizSchema },
])

@Module({
  imports: [collectionQuizModel, AccessModule, UsersModule, QuizzesModule, CollectionsModule],
  controllers: [CollectionQuizController],
  providers: [
    { provide: Repos.collectionQuiz, useClass: CollectionQuizRepo },
    { provide: Mappers.collectionQuiz, useClass: CollectionQuizMapper },
    { provide: Services.collectionQuiz, useClass: CollectionQuizService },
  ],
})
export default class CollectionQuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(CollectionQuizController)
  }
}
