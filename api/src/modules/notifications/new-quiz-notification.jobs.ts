import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { Jobs, Models, NotificationStatus, Queues, Repos } from 'src/utils/constants'
import generateId from 'src/utils/generate-id'
import IQuizRepo from '../quizzes/i-quizzes.repository'
import {
  NewQuizNotificationArgs,
  QuizApprovedNotificationArgs,
} from './i-new-quiz-notification.events'
import INewQuizNotificationRepo from './repositories/i-new-quiz-notification'

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

  @Process(Jobs.quizApprovedNotification)
  async quizApprovedNotification({ data }: Job<QuizApprovedNotificationArgs>) {
    const existingNotification = await this.newQuizNotificationRepo.getNewQuizNotificationById(
      data.notificationId,
    )

    if (!existingNotification) return

    await this.newQuizNotificationRepo.saveNewQuizNotification({
      ...existingNotification,
      status: NotificationStatus.read,
      decision: data.decision,
    })
  }
}
