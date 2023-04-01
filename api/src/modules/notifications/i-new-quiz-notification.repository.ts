import NewQuizNotification from './new-quiz-notification.domain'

export default interface INewQuizNotificationRepo {
  saveNewQuizNotification(args: NewQuizNotification): Promise<NewQuizNotification>
  getNewQuizNotificationById(notificationId: string): Promise<NewQuizNotification | null>
}
