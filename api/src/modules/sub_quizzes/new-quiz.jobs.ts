import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Queues, Repos } from 'src/utils/constants'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { NewSubQuizArgs } from './i-new-sub-quiz.events'
import ISubQuizRepo from './i-sub-quizzes.repository'

@Processor(Queues.newQuizNotification)
export class NewSubQuizConsumer {
  constructor(
    @Inject(Repos.subQuiz) private subQuizRepo: ISubQuizRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
  ) {}

  @Process(Jobs.newSubQuiz)
  async newSubQuiz({ data }: Job<NewSubQuizArgs>) {
    const existingQuiz = await this.quizRepo.getQuizById(data.quizId)
    if (!existingQuiz) return

    const subQuizzes = await this.subQuizRepo.listQuizSubQuizzes(data.quizId)
    const totalDificulity = subQuizzes.reduce((prev, curr) => prev + curr.dificulity, 0)

    await this.quizRepo.saveQuiz({
      ...existingQuiz,
      dificulity: totalDificulity / subQuizzes.length,
      subQuizzesCount: subQuizzes.length,
    })
  }
}
