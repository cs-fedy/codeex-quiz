export type NewEnrolledSubQuizArgs = {
  userId: string
  quizId: string
  subQuizId: string
}

export default interface IEnrolledSubQuizEvents {
  newEnrolledSubQuiz(args: NewEnrolledSubQuizArgs): Promise<void>
}
