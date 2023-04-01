import NewQuizNotification from '../domains/new-quiz-notification'

export default interface INewQuizNotificationRepo {
  saveNewQuizNotification(args: NewQuizNotification): Promise<NewQuizNotification>
  getNewQuizNotificationById(notificationId: string): Promise<NewQuizNotification | null>
  listNewQuizNotifications(): Promise<Array<NewQuizNotification>>
}
