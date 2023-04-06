import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Queues, Repos } from 'src/utils/constants'
import IEnrolledQuizRepo from '../enrolled_quizzes/i-enrolled-quizzes.repository'
import IEnrolledSubQuizRepo from './i-enrolled-quizzes.repository'
import { NewEnrolledSubQuizArgs } from './i-enrolled-sub-quizzes.events'

@Processor(Queues.newEnrolledSubQuiz)
export class NewEnrolledSubQuizConsumer {
  constructor(
    @Inject(Repos.enrolledSubQuiz) private enrolledSubQuizRepo: IEnrolledSubQuizRepo,
    @Inject(Repos.enrolledQuiz) private enrolledQuizRepo: IEnrolledQuizRepo,
  ) {}

  @Process(Jobs.newEnrolledSubQuiz)
  async newEnrolledSubQuiz({ data }: Job<NewEnrolledSubQuizArgs>) {
    const existingEnrolledQuiz = await this.enrolledQuizRepo.getEnrolledQuiz(
      data.userId,
      data.quizId,
    )

    if (!existingEnrolledQuiz) return

    const enrolledSubQuizzes = await this.enrolledSubQuizRepo.listEnrolledSubQuizzes(
      data.userId,
      data.quizId,
    )

    const completedSubQuizzesCount = enrolledSubQuizzes.reduce(
      (prev, curr) => (curr.isCompleted ? prev + 1 : prev),
      0,
    )

    const points = enrolledSubQuizzes.reduce(
      (prev, curr) => (curr.isCompleted ? prev + curr.points : prev),
      0,
    )

    await this.enrolledQuizRepo.saveEnrolledQuiz({
      ...existingEnrolledQuiz,
      completedSubQuizzesCount,
      points,
    })
  }
}
