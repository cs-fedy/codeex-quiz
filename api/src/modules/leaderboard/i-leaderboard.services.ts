import Either from 'src/utils/either'
import { QuizNotAvailable, QuizNotFound } from 'src/utils/types'
import LeaderboardDTO from './leaderboard.dto'

export type GetGlobalLeaderboardResult = Either<never, Array<LeaderboardDTO>>

export type GetQuizLeaderboardArgs = {
  userId: string
  quizId: string
}

export type GetQuizLeaderboardResult = Either<
  QuizNotFound | QuizNotAvailable,
  Array<LeaderboardDTO>
>

export default interface ILeaderboardService {
  getGlobalLeaderboard(): Promise<GetGlobalLeaderboardResult>
  getQuizLeaderboard(args: GetQuizLeaderboardArgs): Promise<GetQuizLeaderboardResult>
}
