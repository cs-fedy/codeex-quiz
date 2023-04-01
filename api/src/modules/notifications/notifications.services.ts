import { Inject, Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import { Mappers, Repos } from 'src/utils/constants'
import { Right } from 'src/utils/either'
import NewQuizNotification from './domains/new-quiz-notification'
import INotificationService, {
  ListEmitterNotificationsResult,
  ListNewQuizNotificationsResult,
} from './i-notifications.services'
import NewQuizNotificationDTO from './new-quiz-notification'
import INewQuizNotificationRepo from './repositories/i-new-quiz-notification'
import INotificationRepo from './repositories/i-notifications'

@Injectable()
export default class NotificationService implements INotificationService {
  constructor(
    @Inject(Mappers.newQuizNotification)
    private newQuizNotificationMapper: IMapper<NewQuizNotification, NewQuizNotificationDTO>,
    @Inject(Repos.newQuizNotification) private newQuizNotificationRepo: INewQuizNotificationRepo,
    @Inject(Repos.notification) private notificationRepo: INotificationRepo,
  ) {}

  async listNewQuizNotifications(): Promise<ListNewQuizNotificationsResult> {
    const notifications = await this.newQuizNotificationRepo.listNewQuizNotifications()
    const mappedNotifications = notifications.map(this.newQuizNotificationMapper.toDTO)
    return Right.create(mappedNotifications)
  }

  async listEmitterNotifications(emitterId: string): Promise<ListEmitterNotificationsResult> {
    const notifications = await this.notificationRepo.listNotificationByEmitterId(emitterId)
    const mappedNotifications = notifications.map((notification) =>
      this.newQuizNotificationMapper.toDTO(notification as unknown as NewQuizNotification),
    )

    return Right.create(mappedNotifications)
  }
}
