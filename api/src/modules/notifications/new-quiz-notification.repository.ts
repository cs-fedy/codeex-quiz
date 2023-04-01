import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import IMapper from 'src/common/mapper'
import { Mappers, Models } from 'src/utils/constants'
import INewQuizNotificationRepo from './i-new-quiz-notification.repository'
import NewQuizNotification from './new-quiz-notification.domain'
import NewQuizNotificationDTO from './new-quiz-notification.dto'
import { NewQuizNotificationDocument } from './new-quiz-notification.model'

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
}
