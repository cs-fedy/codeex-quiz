import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Left, Right } from 'src/utils/either'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import ILeaderboardRepo from './i-leaderboard.repository'
import ILeaderboardService, {
  GetGlobalLeaderboardResult,
  GetQuizLeaderboardArgs,
  GetQuizLeaderboardResult,
} from './i-leaderboard.services'
import Leaderboard from './leaderboard.domain'
import LeaderboardDTO from './leaderboard.dto'

@Injectable()
export default class LeaderboardService implements ILeaderboardService {
  constructor(
    @Inject(Repos.leaderboard) private leaderboardRepo: ILeaderboardRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
    @Inject(Mappers.leaderboard) private leaderboardMapper: IMapper<Leaderboard, LeaderboardDTO>,
  ) {}

  async getGlobalLeaderboard(): Promise<GetGlobalLeaderboardResult> {
    const recentLeaderboard = await this.leaderboardRepo.listRecentLeaderboard()
    const mappedLeaderboard = recentLeaderboard.map(this.leaderboardMapper.toDTO)

    const sortedLeaderboardList = mappedLeaderboard.sort(
      (currentLeaderboard, nextLeaderboard) => currentLeaderboard.points - nextLeaderboard.points,
    )

    return Right.create(sortedLeaderboardList)
  }

  async getQuizLeaderboard(args: GetQuizLeaderboardArgs): Promise<GetQuizLeaderboardResult> {
    const existingQuiz = await this.quizRepo.getQuizById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: 'quiz_not_found',
        status: HttpStatus.NOT_FOUND,
        message: 'quiz not found',
      })

    if (existingQuiz.creator !== args.userId && !existingQuiz.isVisible)
      return Left.create({
        code: 'quiz_not_available',
        status: HttpStatus.BAD_REQUEST,
        message: 'quiz not available',
      })

    const leaderboardList = await this.leaderboardRepo.listQuizLeaderboard(args.quizId)
    const mappedLeaderboard = leaderboardList.map(this.leaderboardMapper.toDTO)

    const sortedLeaderboardList = mappedLeaderboard.sort(
      (currentLeaderboard, nextLeaderboard) => currentLeaderboard.points - nextLeaderboard.points,
    )

    return Right.create(sortedLeaderboardList)
  }
}
