import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Events, Mappers, Models, Queues, Repos } from 'src/utils/constants'
import QuizzesModule from '../quizzes/quizzes.module'
import NewQuizNotificationEvents from './new-quiz-notification.events'
import { NewQuizNotificationConsumer } from './new-quiz-notification.jobs'
import NewQuizNotificationMapper from './new-quiz-notification.mapper'
import { NewQuizNotificationSchema } from './new-quiz-notification.model'
import NewQuizNotificationRepo from './new-quiz-notification.repository'
import { NotificationSchema } from './notifications.model'

const notificationModel = MongooseModule.forFeature([
  {
    name: Models.notifications,
    schema: NotificationSchema,
    discriminators: [{ name: Models.newQuizzes, schema: NewQuizNotificationSchema }],
  },
])

const newNotificationQueue = BullModule.registerQueue({ name: Queues.newQuizNotification })

@Module({
  imports: [newNotificationQueue, notificationModel, QuizzesModule],
  providers: [
    { provide: Mappers.newQuizNotification, useClass: NewQuizNotificationMapper },
    { provide: Repos.newQuizNotification, useClass: NewQuizNotificationRepo },
    { provide: Events.newQuizNotification, useClass: NewQuizNotificationEvents },
    { provide: Queues.newQuizNotification, useClass: NewQuizNotificationConsumer },
  ],
  exports: [
    { provide: Events.newQuizNotification, useClass: NewQuizNotificationEvents },
    { provide: Repos.newQuizNotification, useClass: NewQuizNotificationRepo },
  ],
})
export default class NotificationsModule {}
