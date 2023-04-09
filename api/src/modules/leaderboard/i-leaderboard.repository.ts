import Leaderboard from './leaderboard.domain'

export default interface ILeaderboardRepo {
  getRecentVersion(): Promise<number>
  addLeaderboard(args: Array<Leaderboard>): Promise<Array<Leaderboard>>
  listRecentLeaderboard(): Promise<Array<Leaderboard>>
}
