import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import NewQuizNotification from '../domains/new-quiz-notification'
import { Notification, NotificationDocument } from '../models/notifications'
import NewQuizNotificationDTO from '../new-quiz-notification'
import INotificationRepo from './i-notifications'

@Injectable()
export default class NotificationRepo implements INotificationRepo {
  constructor(
    @Inject(Mappers.newQuizNotification)
    private newQuizNotificationMapper: IMapper<NewQuizNotification, NewQuizNotificationDTO>,
    @InjectModel(Models.notifications) private notificationModel: Model<NotificationDocument>,
  ) {}

  // TODO: fix the mapping
  async listNotificationByEmitterId(emitterId: string): Promise<Array<Notification>> {
    const notifications = await this.notificationModel.find({ emitter: emitterId })
    const mappedNotifications = notifications.map(
      (notification) =>
        this.newQuizNotificationMapper.toDomain(notification) as unknown as Notification,
    )

    return mappedNotifications
  }
}
