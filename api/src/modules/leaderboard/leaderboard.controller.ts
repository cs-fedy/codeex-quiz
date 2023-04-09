import { Body, Controller, Get, HttpException, Inject, Param, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import ILeaderboardService from './i-leaderboard.services'

@Controller(Routes.leaderboard)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class LeaderboardController {
  constructor(@Inject(Services.leaderboard) private leaderboardService: ILeaderboardService) {}

  @Get(Routes.global)
  async getGlobalLeaderboard() {
    const leaderboard = await this.leaderboardService.getGlobalLeaderboard()
    if (leaderboard.isRight()) {
      return { leaderboard: leaderboard.value }
    }
  }

  @Get('quizzes/:quizId')
  async getQuizLeaderboard(@Body('userId') userId: string, @Param('quizId') quizId: string) {
    const quizLeaderboard = await this.leaderboardService.getQuizLeaderboard({ userId, quizId })
    if (quizLeaderboard.isLeft()) {
      const { code, message, status } = quizLeaderboard.error
      throw new HttpException({ message, code }, status)
    }

    return { leaderboard: quizLeaderboard.value }
  }
}
