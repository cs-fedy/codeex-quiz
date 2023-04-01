import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Models, NotificationStatus, Queues, Repos } from 'src/utils/constants'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import { NewQuizNotificationArgs } from './i-new-quiz-notification.events'
import INewQuizNotificationRepo from './i-new-quiz-notification.repository'

@Processor(Queues.newQuizNotification)
export class NewQuizNotificationConsumer {
  constructor(
    @Inject(Repos.newQuizNotification) private newQuizNotificationRepo: INewQuizNotificationRepo,
    @Inject(Repos.quiz) private quizRepo: IQuizRepo,
  ) {}

  @Process(Jobs.newQuizNotification)
  async newQuizNotification({ data }: Job<NewQuizNotificationArgs>) {
    const existingQuiz = await this.quizRepo.getQuizById(data.quizId)
    if (!existingQuiz) return

    await this.newQuizNotificationRepo.saveNewQuizNotification({
      ...data,
      emitter: data.userId,
      emittedAt: new Date(),
      notificationId: generateId(),
      status: NotificationStatus.unread,
      type: Models.newQuizzes,
    })
  }
}
