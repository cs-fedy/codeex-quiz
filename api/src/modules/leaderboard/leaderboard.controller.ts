import { Controller, Get, Inject, UseGuards } from '@nestjs/common'
import AccountConfirmedGuard from 'src/guards/confirmed'
import { RoleGuard } from 'src/guards/role'
import { Roles, Routes, Services } from 'src/utils/constants'
import ILeaderboardService from './i-leaderboard.services'

@Controller(Routes.leaderboard)
@UseGuards(AccountConfirmedGuard())
@UseGuards(RoleGuard(Roles.admin, Roles.user))
export default class LeaderboardController {
  constructor(@Inject(Services.leaderboard) private leaderboardService: ILeaderboardService) {}

  @Get()
  async getGlobalLeaderboard() {
    const leaderboard = await this.leaderboardService.getGlobalLeaderboard()
    if (leaderboard.isRight()) {
      return { leaderboard: leaderboard.value }
    }
  }
}
