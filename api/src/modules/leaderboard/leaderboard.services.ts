import { Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Right } from 'src/utils/either'
import ILeaderboardRepo from './i-leaderboard.repository'
import ILeaderboardService, { GetGlobalLeaderboardResult } from './i-leaderboard.services'
import Leaderboard from './leaderboard.domain'
import LeaderboardDTO from './leaderboard.dto'

@Injectable()
export default class LeaderboardService implements ILeaderboardService {
  constructor(
    @Inject(Repos.leaderboard) private leaderboardRepo: ILeaderboardRepo,
    @Inject(Mappers.leaderboard) private leaderboardMapper: IMapper<Leaderboard, LeaderboardDTO>,
  ) {}

  async getGlobalLeaderboard(): Promise<GetGlobalLeaderboardResult> {
    const recentLeaderboard = await this.leaderboardRepo.listRecentLeaderboard()
    const mappedLeaderboard = recentLeaderboard.map(this.leaderboardMapper.toDTO)
    return Right.create(mappedLeaderboard)
  }
}
