import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import BookmarkController from './bookmarks.controller'
import BookmarkMapper from './bookmarks.mapper'
import { BookmarkSchema } from './bookmarks.model'
import BookmarkRepo from './bookmarks.repository'
import BookmarkService from './bookmarks.services'

const bookmarkModel = MongooseModule.forFeature([
  { name: Models.bookmarks, schema: BookmarkSchema },
])

@Module({
  imports: [bookmarkModel, AccessModule, UsersModule, QuizzesModule],
  controllers: [BookmarkController],
  providers: [
    { provide: Mappers.bookmark, useClass: BookmarkMapper },
    { provide: Repos.bookmark, useClass: BookmarkRepo },
    { provide: Services.bookmark, useClass: BookmarkService },
  ],
})
export default class BookmarksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(BookmarkController)
  }
}
