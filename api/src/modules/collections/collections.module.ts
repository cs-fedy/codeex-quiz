import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import UsersModule from '../users/users.module'
import CollectionController from './collections.controller'
import CollectionMapper from './collections.mapper'
import { CollectionSchema } from './collections.model'
import CollectionRepo from './collections.repository'
import CollectionService from './collections.services'

// TODO: add quizzes per collection attributes
const collectionModel = MongooseModule.forFeature([
  { name: Models.collections, schema: CollectionSchema },
])

@Module({
  imports: [collectionModel, AccessModule, UsersModule],
  controllers: [CollectionController],
  providers: [
    { provide: Repos.collection, useClass: CollectionRepo },
    { provide: Mappers.collection, useClass: CollectionMapper },
    { provide: Services.collection, useClass: CollectionService },
  ],
  exports: [{ provide: Repos.collection, useClass: CollectionRepo }],
})
export default class CollectionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(CollectionController)
  }
}
