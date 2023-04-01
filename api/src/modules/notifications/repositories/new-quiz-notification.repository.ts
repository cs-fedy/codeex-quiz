import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import NewQuizNotification from '../domains/new-quiz-notification'
import { NewQuizNotificationDocument } from '../models/new-quiz-notification'
import NewQuizNotificationDTO from '../new-quiz-notification'
import INewQuizNotificationRepo from './i-new-quiz-notification'

@Injectable()
export default class NewQuizNotificationRepo implements INewQuizNotificationRepo {
  constructor(
    @InjectModel(Models.newQuizzes)
    private newQuizNotificationModel: Model<NewQuizNotificationDocument>,
    @Inject(Mappers.newQuizNotification)
    private newQuizNotificationMapper: IMapper<NewQuizNotification, NewQuizNotificationDTO>,
  ) {}

  async saveNewQuizNotification(args: NewQuizNotification): Promise<NewQuizNotification> {
    const newNotification = this.newQuizNotificationMapper.toPersistence(args)
    const savesNotification = await this.newQuizNotificationModel.findByIdAndUpdate(
      args.notificationId,
      newNotification,
      {
        upsert: true,
        new: true,
      },
    )

    return this.newQuizNotificationMapper.toDomain(savesNotification)
  }

  async getNewQuizNotificationById(notificationId: string): Promise<NewQuizNotification | null> {
    const fetchedNotification = await this.newQuizNotificationModel.findById(notificationId)
    return fetchedNotification ? this.newQuizNotificationMapper.toDomain(fetchedNotification) : null
  }

  async listNewQuizNotifications(): Promise<NewQuizNotification[]> {
    const notifications = await this.newQuizNotificationModel.find()
    return notifications.map(this.newQuizNotificationMapper.toDomain)
  }
}
