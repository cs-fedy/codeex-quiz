import EnrolledUniqueChoiceQuestion from './enrolled-unique-choice-questions.domain'

export default interface IEnrolledUniqueChoiceQuestionRepo {
  saveEnrolledUniqueChoiceQuestion(
    args: EnrolledUniqueChoiceQuestion,
  ): Promise<EnrolledUniqueChoiceQuestion>
  getEnrolledUniqueChoiceQuestion(
    userId: string,
    quizId: string,
    subQuizId: string,
  ): Promise<EnrolledUniqueChoiceQuestion | null>
}
