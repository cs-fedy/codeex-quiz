import { Inject, Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Repos } from 'src/utils/constants'
import EnrolledQuiz from '../enrolled_quizzes/enrolled-quizzes.domain'
import IEnrolledQuizRepo from '../enrolled_quizzes/i-enrolled-quizzes.repository'
import ILeaderboardRepo from './i-leaderboard.repository'
import Leaderboard from './leaderboard.domain'

type PointsPerUser = Record<string, { points: number; quizId: string }>

@Injectable()
export default class LeaderboardCronScheduler {
  constructor(
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
    @Inject(Repos.leaderboard) private leaderboardRepo: ILeaderboardRepo,
  ) {}

  @Cron('0 * * * *')
  async generateLeaderboard() {
    const leaderboardList = await this.enrolledQuizRepo.listEnrolledQuizzes()

    // TODO: only completed quiz
    const pointsPerUser = leaderboardList.reduce(
      (prev: PointsPerUser, curr: EnrolledQuiz) => ({
        ...prev,
        [curr.userId]: Object.keys(prev).includes(curr.userId)
          ? { points: prev[curr.userId].points + curr.points, quizId: curr.quizId }
          : { points: curr.points, quizId: curr.quizId },
      }),
      {} as PointsPerUser,
    )

    const latestVersion = await this.leaderboardRepo.getRecentVersion()
    const newestVersion = latestVersion + 1
    const newestVersionDate = new Date()

    const formattedData = Object.entries(pointsPerUser).map(
      ([userId, stats]) =>
        new Leaderboard(newestVersion, userId, stats.quizId, stats.points, newestVersionDate),
    )

    await this.leaderboardRepo.addLeaderboard(formattedData)
  }
}
