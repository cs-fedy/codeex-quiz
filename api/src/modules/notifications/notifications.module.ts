import { BullModule } from '@nestjs/bull'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtMiddleware } from 'src/middleware/jwt'
import { LoggedMiddleware } from 'src/middleware/logged'
import { Events, Mappers, Models, Queues, Repos, Services } from 'src/utils/constants'
import AccessModule from '../access/access.module'
import QuizzesModule from '../quizzes/quizzes.module'
import UsersModule from '../users/users.module'
import NewQuizNotificationMapper from './mappers/new-quiz-notification'
import { NewQuizNotificationSchema } from './models/new-quiz-notification'
import { NotificationSchema } from './models/notifications'
import NewQuizNotificationEvents from './new-quiz-notification.events'
import { NewQuizNotificationConsumer } from './new-quiz-notification.jobs'
import NotificationController from './notifications.controller'
import NotificationService from './notifications.services'
import NewQuizNotificationRepo from './repositories/new-quiz-notification.repository'
import NotificationRepo from './repositories/notifications'

const notificationModel = MongooseModule.forFeature([
  {
    name: Models.notifications,
    schema: NotificationSchema,
    discriminators: [{ name: Models.newQuizzes, schema: NewQuizNotificationSchema }],
  },
])

const newNotificationQueue = BullModule.registerQueue({ name: Queues.newQuizNotification })

@Module({
  imports: [newNotificationQueue, notificationModel, AccessModule, UsersModule, QuizzesModule],
  controllers: [NotificationController],
  providers: [
    { provide: Mappers.newQuizNotification, useClass: NewQuizNotificationMapper },
    { provide: Repos.newQuizNotification, useClass: NewQuizNotificationRepo },
    { provide: Events.newQuizNotification, useClass: NewQuizNotificationEvents },
    { provide: Queues.newQuizNotification, useClass: NewQuizNotificationConsumer },
    { provide: Services.notification, useClass: NotificationService },
    { provide: Repos.notification, useClass: NotificationRepo },
  ],
  exports: [
    { provide: Events.newQuizNotification, useClass: NewQuizNotificationEvents },
    { provide: Repos.newQuizNotification, useClass: NewQuizNotificationRepo },
  ],
})
export default class NotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(NotificationController)
  }
}
