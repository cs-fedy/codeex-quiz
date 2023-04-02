import UniqueChoiceQuestion from './unique-choice-question.domain'

export default interface IUniqueChoiceQuestionRepo {
  saveUniqueChoiceQuestion(args: UniqueChoiceQuestion): Promise<UniqueChoiceQuestion>
  getUniqueChoiceQuestion(subQuizId: string): Promise<UniqueChoiceQuestion | null>
}
