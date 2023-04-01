import { Injectable } from '@nestjs/common'
import IMapper from 'src/common/mapper'
import NewQuizNotification from './domains/new-quiz-notification'
import NewQuizNotificationDTO from './new-quiz-notifications.dto'

@Injectable()
export default class NewQuizNotificationMapper
  implements IMapper<NewQuizNotification, NewQuizNotificationDTO>
{
  toDomain(raw: any): NewQuizNotification {
    return new NewQuizNotification(
      raw._id,
      raw.__type,
      raw.emitter,
      raw.status,
      raw.emittedAt,
      raw.quizId,
      raw.decision,
    )
  }

  toPersistence(domain: NewQuizNotification): any {
    return {
      _id: domain.notificationId,
      __type: domain.type,
      emitter: domain.emitter,
      status: domain.status,
      emittedAt: domain.emittedAt,
      quizId: domain.quizId,
      decision: domain.decision,
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
      domain.decision,
    )
  }
}
