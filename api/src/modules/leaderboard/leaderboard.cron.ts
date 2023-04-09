import { Inject, Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Repos } from 'src/utils/constants'
import EnrolledQuiz from '../enrolled_quizzes/enrolled-quizzes.domain'
import IEnrolledQuizRepo from '../enrolled_quizzes/i-enrolled-quizzes.repository'
import ILeaderboardRepo from './i-leaderboard.repository'
import Leaderboard from './leaderboard.domain'

@Injectable()
export default class LeaderboardCronScheduler {
  constructor(
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Repos.leaderboard) private leaderboardRepo: ILeaderboardRepo,
  ) {}

  @Cron('0 * * * *')
  async generateLeaderboard() {
    const leaderboardList = await this.enrolledQuizRepo.listEnrolledQuizzes()

    const pointsPerUser = leaderboardList.reduce(
      (prev: Record<string, number>, curr: EnrolledQuiz) => ({
        ...prev,
        [curr.userId]: Object.keys(prev).includes(curr.userId)
          ? prev[curr.userId] + curr.points
          : curr.points,
      }),
      {} as Record<string, number>,
    )

    const latestVersion = await this.leaderboardRepo.getRecentVersion()
    const newestVersion = latestVersion + 1
    const newestVersionDate = new Date()

    const formattedData = Object.entries(pointsPerUser).map(
      ([userId, points]) => new Leaderboard(newestVersion, userId, points, newestVersionDate),
    )

    await this.leaderboardRepo.addLeaderboard(formattedData)
  }
}
