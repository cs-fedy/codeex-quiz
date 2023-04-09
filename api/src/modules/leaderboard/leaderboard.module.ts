import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Mappers, Models, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import EnrolledQuizzesModule from '../enrolled_quizzes/enrolled-quizzes.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import LeaderboardController from './leaderboard.controller'
import LeaderboardCronScheduler from './leaderboard.cron'
import LeaderboardMapper from './leaderboard.mapper'
import { LeaderboardSchema } from './leaderboard.model'
import LeaderboardRepo from './leaderboard.repository'
import LeaderboardService from './leaderboard.services'

const leaderboardModel = MongooseModule.forFeature([
  { name: Models.leaderboard, schema: LeaderboardSchema },
])

@Module({
  imports: [leaderboardModel, AccessModule, UsersModule, QuizzesModule, EnrolledQuizzesModule],
  controllers: [LeaderboardController],
  providers: [
    LeaderboardCronScheduler,
    { provide: Services.leaderboard, useClass: LeaderboardService },
    { provide: Mappers.leaderboard, useClass: LeaderboardMapper },
    { provide: Repos.leaderboard, useClass: LeaderboardRepo },
  ],
})
export default class LeaderboardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(LeaderboardController)
  }
}
