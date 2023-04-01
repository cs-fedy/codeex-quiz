import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import NewQuizNotification from './new-quiz-notification.domain'
import NewQuizNotificationDTO from './new-quiz-notification.dto'

@Injectable()
export default class NewQuizNotificationMapper
  implements IMapper<NewQuizNotification, NewQuizNotificationDTO>
{
  toDomain(raw: any): NewQuizNotification {
    return new NewQuizNotification(
      raw._id,
      raw.type,
      raw.emitter,
      raw.status,
      raw.emittedAt,
      raw.quizId,
    )
  }

  toPersistence(domain: NewQuizNotification): any {
    return {
      _id: domain.notificationId,
      type: domain.type,
      emitter: domain.emitter,
      status: domain.status,
      emittedAt: domain.emittedAt,
      quizId: domain.quizId,
    }
  }

  toDTO(domain: NewQuizNotification): NewQuizNotificationDTO {
    return new NewQuizNotificationDTO(
      domain.notificationId,
      domain.type,
      domain.emitter,
      domain.status,
      domain.emittedAt,
      domain.quizId,
    )
  }
}
