import EnrolledSubQuiz from './enrolled-sub-quizzes.domain'

export default interface IEnrolledSubQuizRepo {
  listEnrolledSubQuizzes(userId: string, quizId: string): Promise<Array<EnrolledSubQuiz>>
  getEnrolledSubQuizMetadata(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledSubQuiz | null>
}
