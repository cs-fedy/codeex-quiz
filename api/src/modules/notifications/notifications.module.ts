import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mappers, Models, Repos } from 'src/utils/constants'
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

@Module({
  imports: [notificationModel],
  providers: [
    { provide: Mappers.newQuizNotification, useClass: NewQuizNotificationMapper },
    { provide: Repos.newQuizNotification, useClass: NewQuizNotificationRepo },
  ],
})
export default class NotificationsModule {}
