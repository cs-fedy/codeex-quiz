import EnrolledTrueFalseQuestion from './enrolled-true-false-questions.domain'

export default interface IEnrolledTrueFalseQuestionRepo {
  saveEnrolledTrueFalseQuestion(args: EnrolledTrueFalseQuestion): Promise<EnrolledTrueFalseQuestion>
  getEnrolledTrueFalseQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledTrueFalseQuestion | null>
}
