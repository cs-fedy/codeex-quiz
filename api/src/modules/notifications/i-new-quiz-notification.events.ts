export type NewQuizNotificationArgs = { userId: string; quizId: string }
export type QuizApprovedNotificationArgs = { notificationId: string; decision?: string }

export default interface INewQuizNotificationEvents {
  newQuizNotification(args: NewQuizNotificationArgs): Promise<void>
  quizApprovedNotification(args: QuizApprovedNotificationArgs): Promise<void>
}
