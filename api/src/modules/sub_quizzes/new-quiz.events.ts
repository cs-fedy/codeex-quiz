import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import INewSubQuizEvents, { NewSubQuizArgs } from './i-new-sub-quiz.events'

@Injectable()
export default class NewSubQuizEvents implements INewSubQuizEvents {
  constructor(@InjectQueue(Queues.newSubQuiz) private newSubQuizQueue: Queue) {}

  async newSubQuiz(args: NewSubQuizArgs): Promise<void> {
    await this.newSubQuizQueue.add(Jobs.newSubQuiz, args)
  }
}
