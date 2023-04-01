export type NewQuizNotificationArgs = { userId: string; quizId: string }
export default interface INewQuizNotificationEvents {
  newQuizNotification(args: NewQuizNotificationArgs): Promise<void>
}
