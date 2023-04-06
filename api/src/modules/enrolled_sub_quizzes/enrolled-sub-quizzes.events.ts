import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import IEnrolledSubQuizzesEvents, { NewEnrolledSubQuizArgs } from './i-enrolled-sub-quizzes.events'

@Injectable()
export default class EnrolledSubQuizEvents implements IEnrolledSubQuizzesEvents {
  constructor(@InjectQueue(Queues.newEnrolledSubQuiz) private newEnrolledSubQuizQueue: Queue) {}

  async newEnrolledSubQuiz(args: NewEnrolledSubQuizArgs): Promise<void> {
    await this.newEnrolledSubQuizQueue.add(Jobs.newEnrolledSubQuiz, args)
  }
}
