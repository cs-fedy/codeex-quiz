import EnrolledMultipleChoiceQuestion from './enrolled-multiple-choice-questions.domain'

export default interface IEnrolledMultipleChoiceQuestionRepo {
  saveEnrolledMultipleChoiceQuestion(
    args: EnrolledMultipleChoiceQuestion,
  ): Promise<EnrolledMultipleChoiceQuestion>
  getEnrolledMultipleChoiceQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledMultipleChoiceQuestion | null>
}
