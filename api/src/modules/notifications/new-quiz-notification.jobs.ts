import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Queues, Repos } from 'src/utils/constants'
import { NewQuizNotificationArgs } from './i-new-quiz-notification.events'
import INewQuizNotificationRepo from './i-new-quiz-notification.repository'

@Processor(Queues.newQuizNotification)
export class NewQuizNotificationConsumer {
  constructor(
    @Inject(Repos.newQuizNotification) private newQuizNotificationRepo: INewQuizNotificationRepo,
  ) {}

  @Process(Jobs.newQuizNotification)
  async newQuizNotification({ data }: Job<NewQuizNotificationArgs>) {
    // TODO: to implement
  }
}
