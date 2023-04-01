import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Jobs, Queues } from 'src/utils/constants'
import INewQuizNotificationEvents, {
  NewQuizNotificationArgs,
  QuizApprovedNotificationArgs,
} from './i-new-quiz-notification.events'

@Injectable()
export default class NewQuizNotificationEvents implements INewQuizNotificationEvents {
  constructor(@InjectQueue(Queues.newQuizNotification) private newQuizNotificationQueue: Queue) {}

  async newQuizNotification(args: NewQuizNotificationArgs): Promise<void> {
    await this.newQuizNotificationQueue.add(Jobs.newQuizNotification, args)
  }

  async quizApprovedNotification(args: QuizApprovedNotificationArgs): Promise<void> {
    await this.newQuizNotificationQueue.add(Jobs.quizApprovedNotification, args)
  }
}
