import Either from 'src/utils/either'
import Notification from './domains/notifications'
import NewQuizNotificationDTO from './new-quiz-notification'

export type ListEmitterNotificationsResult = Either<never, Array<Notification>>
export type ListNewQuizNotificationsResult = Either<never, Array<NewQuizNotificationDTO>>

export default interface INotificationService {
  listEmitterNotifications(emitterId: string): Promise<ListEmitterNotificationsResult>
  listNewQuizNotifications(): Promise<ListNewQuizNotificationsResult>
}
