import EnrolledQuiz from './enrolled-quizzes.domain'

export default interface IEnrolledQuizRepo {
  saveEnrolledQuiz(args: EnrolledQuiz): Promise<EnrolledQuiz>
  isEnrolled(userId: string, quizId: string): Promise<boolean>
  listEnrolledQuizzes(userId: string): Promise<Array<EnrolledQuiz>>
}
