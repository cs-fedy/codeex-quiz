import Either from 'src/utils/either'
import LeaderboardDTO from './leaderboard.dto'

export type GetGlobalLeaderboardResult = Either<never, Array<LeaderboardDTO>>

export default interface ILeaderboardService {
  getGlobalLeaderboard(): Promise<GetGlobalLeaderboardResult>
}
